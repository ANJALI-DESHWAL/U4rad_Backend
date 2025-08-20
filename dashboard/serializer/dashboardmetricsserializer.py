from rest_framework import serializers
from dashboard.models.dashboardmetrics import DashboardMetrics
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # Include the fields you want

class DashboardMetricsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Nested user representation

    class Meta:
        model = DashboardMetrics
        fields = [
            'id',
            'user',
            'total_orders',
            'total_spent',
            'total_calculations',
            'last_login',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at', 'last_login']  # Optional
