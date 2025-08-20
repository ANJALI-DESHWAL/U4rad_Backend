from rest_framework import serializers
from decimal import Decimal
from Cart.Models.Cart import Cart
from Cart.Models.Services import Service
from Cart.Serializer.ServiceSerializer import ServiceSerializer


class CartSerializer(serializers.ModelSerializer):
    # Nested representation of services
    services = ServiceSerializer(many=True, read_only=True)

    # Allow adding services via IDs
    service_ids = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(), many=True, write_only=True, required=False
    )

    class Meta:
        model = Cart
        fields = ["id", "user_id", "services", "service_ids", "total_amount"]

    def create(self, validated_data):
        # Extract service_ids
        service_ids = validated_data.pop("service_ids", [])
        cart = Cart.objects.create(**validated_data)

        if service_ids:
            cart.services.set(service_ids)

        # Calculate total_amount from services
        cart.total_amount = sum(
            (s.rate * s.quantity for s in cart.services.all()), Decimal("0.00")
        )
        cart.save()
        return cart

    def update(self, instance, validated_data):
        # Extract service_ids if provided
        service_ids = validated_data.pop("service_ids", None)

        # Update normal fields
        instance.user_id = validated_data.get("user_id", instance.user_id)
        instance.save()

        # Update services if service_ids provided
        if service_ids is not None:
            instance.services.set(service_ids)

        # Recalculate total_amount
        instance.total_amount = sum(
            (s.rate * s.quantity for s in instance.services.all()), Decimal("0.00")
        )
        instance.save()
        return instance
