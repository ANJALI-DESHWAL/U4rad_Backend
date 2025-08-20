from rest_framework import serializers
from dashboard.models.TopUpTransaction import TopUpTransaction


class TopUpTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopUpTransaction
        fields = ["id", "account", "amount", "created_at"]
