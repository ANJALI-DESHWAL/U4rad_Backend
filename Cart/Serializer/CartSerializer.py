import time
from rest_framework import serializers
from Cart.Models.Cart import Order, OrderService
from Cart.Models.Services import Service
from dashboard.models.user import CustomUser
from Cart.utils.pdf_utils import generate_invoice_pdf


# --------- (for GET) ----------
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "name"]


class OrderServiceReadSerializer(serializers.ModelSerializer):
    service = ServiceSerializer()

    class Meta:
        model = OrderService
        fields = ["id", "service", "quantity", "amount"]


class OrderSerializer(serializers.ModelSerializer):
    client_email = serializers.EmailField(source="client.email", read_only=True)
    client_username = serializers.CharField(source="client.username", read_only=True)
    services = OrderServiceReadSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "order_id",
            "client_email",
            "client_username",
            "services",
            "total_amount",
            "discount",
            "grand_total",
            "payment_status",
        ]


# --------(for POST) ----------
class OrderServiceWriteSerializer(serializers.ModelSerializer):
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())

    class Meta:
        model = OrderService
        fields = ["service", "quantity", "amount"]

    def to_internal_value(self, data):
        # If "service" comes as dict {id: .., name: ..}, extract id
        service = data.get("service")
        if isinstance(service, dict):
            data["service"] = service.get("id")
        return super().to_internal_value(data)


class OrderCreateSerializer(serializers.ModelSerializer):
    services = OrderServiceWriteSerializer(many=True)
    client_email = serializers.EmailField(write_only=True)   # accept email instead of id

    class Meta:
        model = Order
        fields = [
            "client_email",     # accepts email instead of id
            "order_id",         # generated, not required in POST
            "services",
            "total_amount",
            "discount",
            "grand_total",
            "payment_status",
        ]
        read_only_fields = ["order_id"]

    def create(self, validated_data):
        services_data = validated_data.pop("services")
        client_email = validated_data.pop("client_email")

        # resolve client by email
        try:
            client = CustomUser.objects.get(email=client_email)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError(
                {"client_email": "User with this email does not exist."}
            )

        # ✅ Generate unique order_id
        order_id = f"ORDER_{int(time.time() * 1000)}"

        # create order with resolved client + order_id
        order = Order.objects.create(client=client, order_id=order_id, **validated_data)

        # create services for this order
        for svc in services_data:
            OrderService.objects.create(order=order, **svc)

        # 👇 Generate invoice PDF only if payment_status is True
        if order.payment_status:
            pdf_path = generate_invoice_pdf(order)
            if hasattr(order, "invoice_pdf"):  # only if you added invoice_pdf field
                from django.core.files import File
                with open(pdf_path, "rb") as f:
                    order.invoice_pdf.save(pdf_path.replace("media/", ""), File(f), save=True)

        return order

    def to_representation(self, instance):
        """Return full nested order details after creation"""
        return OrderSerializer(instance).data
