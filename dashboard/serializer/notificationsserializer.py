from rest_framework import serializers
from dashboard.models.notifications import Notification

class NotificationSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # shows user's email (from __str__)

    class Meta:
        model = Notification
        fields = [
            'id',
            'user',
            'title',
            'message',
            'notification_type',
            'is_read',
            'created_at',
        ]
