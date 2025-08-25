from rest_framework import serializers
from dashboard.models.Account import Account


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ["id", "total_amount_paid", "current_balance"]
