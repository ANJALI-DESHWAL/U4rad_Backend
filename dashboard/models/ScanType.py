from django.db import models


class ScanType(models.Model):
    SCAN_CHOICES = [
        ('XRAY', 'X-Ray'),
        ('CT', 'CT Scan'),
        ('MRI', 'MRI'),
        ('MAMMO', 'Mammogram'),
    ]

    scan_type = models.CharField(max_length=10, choices=SCAN_CHOICES, unique=True)
    expected = models.PositiveIntegerField(default=0)
    completed = models.PositiveIntegerField(default=0)
    balance = models.PositiveIntegerField(default=0)
def __str__(self):
    return f"{dict(self.SCAN_CHOICES).get(self.scan_type, self.scan_type)} - Completed: {self.completed}/{self.expected}"


