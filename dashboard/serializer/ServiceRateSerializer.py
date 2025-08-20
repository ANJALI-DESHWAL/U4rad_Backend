from rest_framework import serializers
from dashboard.models.ServiceRate import ServiceRate

class ServiceRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRate
        fields = ['id', 'service', 'min_quantity', 'max_quantity', 'rate']
