from rest_framework import serializers
from Cart.Models.Services import Service, PriceRange


class PriceRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceRange
        fields = ["id", "start_quantity", "end_quantity", "price"]


class ServiceSerializer(serializers.ModelSerializer):
    price_ranges = PriceRangeSerializer(many=True)  # nested serializer

    class Meta:
        model = Service
        fields = ["id", "name", "price_ranges"]

    # ✅ Handle nested create
    def create(self, validated_data):
        price_ranges_data = validated_data.pop("price_ranges")
        service = Service.objects.create(**validated_data)
        for pr in price_ranges_data:
            PriceRange.objects.create(service=service, **pr)
        return service

    # ✅ Handle nested update
    def update(self, instance, validated_data):
        price_ranges_data = validated_data.pop("price_ranges", None)
        instance.name = validated_data.get("name", instance.name)
        instance.save()

        if price_ranges_data is not None:
            # clear old ranges and recreate
            instance.price_ranges.all().delete()
            for pr in price_ranges_data:
                PriceRange.objects.create(service=instance, **pr)

        return instance
