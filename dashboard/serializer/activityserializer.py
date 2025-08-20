from rest_framework import serializers
from dashboard.models.activity import Activity

class ActivitySerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source="user.email", read_only=True)
    action_display = serializers.CharField(source="get_action_display", read_only=True)

    class Meta:
        model = Activity
        fields = [
            "id",
            "user",
            "user_email",
            "action",
            "action_display",
            "description",
            "ip_address",
            "user_agent",
            "timestamp",
        ]
        read_only_fields = ["id", "timestamp"]
