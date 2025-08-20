from rest_framework import serializers
from dashboard.models.RecentActivity import RecentActivity


class RecentActivitySerializer(serializers.ModelSerializer):
    formatted_timestamp = serializers.DateTimeField(
    source="timestamp", 
    format="%Y-%m-%d %H:%M:%S",  # type: ignore
    read_only=True
)

    class Meta:
        model = RecentActivity
        fields = ["id", "scan_type", "description", "scans_count", "status", "timestamp", "formatted_timestamp"]
