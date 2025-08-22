from rest_framework import serializers
from Cart.Models.PromoCode import PromoCode


# Serializer for creating/updating promo codes
class PromoCodeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromoCode
        fields = ["code", "discount_percentage", "valid_from", "valid_to", "active"]


# Serializer for fetching promo codes (adds computed field)
class PromoCodeSerializer(serializers.ModelSerializer):
    is_code_valid = serializers.SerializerMethodField()

    class Meta:
        model = PromoCode
        fields = ["id", "code", "discount_percentage", "valid_from", "valid_to", "active", "is_code_valid"]

    def get_is_code_valid(self, obj):
        return obj.is_valid()
