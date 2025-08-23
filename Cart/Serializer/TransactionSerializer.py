from rest_framework import serializers
from Cart.Models.Transaction import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ['total_amount', 'discount', 'grand_total', 'created_at']

    def create(self, validated_data):
        # Automatically calculate amounts
        quantity = validated_data.get('quantity', 1)
        amount = validated_data.get('amount', 0)
        discount = validated_data.get('discount', 0)
        total_amount = quantity * amount
        grand_total = total_amount - discount
        
        validated_data['total_amount'] = total_amount
        validated_data['grand_total'] = grand_total
        
        return super().create(validated_data)
