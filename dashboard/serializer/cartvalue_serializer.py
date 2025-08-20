from rest_framework import serializers
from dashboard.models.CartValue import CartValue   # adjust path if needed

class CartValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartValue
        fields = '__all__'   # exposes all fields (id, user, promo_code, totals, created_at)
