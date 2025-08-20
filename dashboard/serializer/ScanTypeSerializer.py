from rest_framework import serializers
from dashboard.models.ScanType import ScanType


class ScanTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScanType
        fields = ["id", "scan_type", "expected", "completed", "balance"]
