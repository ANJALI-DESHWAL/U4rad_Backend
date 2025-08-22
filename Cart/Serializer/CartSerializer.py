from rest_framework import serializers
from Cart.Models.Cart import Order, OrderService
from Cart.Models.Services import Service
from dashboard.models.user import CustomUser


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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email"]


class OrderSerializer(serializers.ModelSerializer):
    client = UserSerializer()
    services = OrderServiceReadSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "order_id",
            "client",
            "services",
            "total_amount",
            "discount",
            "grand_total",
            "payment_status",
        ]


# --------(for POST) ----------
class OrderServiceWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderService
        fields = ["service", "quantity", "amount"]  # expects service id


class OrderCreateSerializer(serializers.ModelSerializer):
    services = OrderServiceWriteSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            "client",          # expects client id
            "order_id",
            "services",
            "total_amount",
            "discount",
            "grand_total",
            "payment_status",
        ]

    def create(self, validated_data):
        services_data = validated_data.pop("services")
        order = Order.objects.create(**validated_data)

        for svc in services_data:
            OrderService.objects.create(order=order, **svc)

        return order
