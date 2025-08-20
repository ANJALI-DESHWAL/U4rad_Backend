from rest_framework import serializers
from dashboard.models.RateCard import RateCard


class RateCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = RateCard
        fields = ["id", "name", "price_per_scan"]
