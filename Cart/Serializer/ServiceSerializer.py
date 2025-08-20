from rest_framework import serializers
from Cart.Models.Services import Service  # import the model correctly

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "name", "quantity", "rate", "quantity_range"]
