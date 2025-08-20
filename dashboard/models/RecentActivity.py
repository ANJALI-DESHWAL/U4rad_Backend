from django.db import models
from dashboard.models.ScanType import ScanType  # assuming ScanType is in same app


class RecentActivity(models.Model):
    STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('processing', 'Processing'),
        ('delivered', 'Delivered'),
    ]

    scan_type = models.ForeignKey(ScanType, on_delete=models.CASCADE, related_name="activities")
    description = models.CharField(max_length=255)
    scans_count = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.scan_type.scan_type} - {self.description}"
