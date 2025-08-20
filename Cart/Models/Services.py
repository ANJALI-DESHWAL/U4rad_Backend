from django.db import models

class Service(models.Model):
    name = models.CharField(max_length=100)       # e.g. "XRAY"
    quantity = models.IntegerField(default=0)     # e.g. 1
    rate = models.DecimalField(max_digits=10, decimal_places=2)  # e.g. 30.00
    quantity_range = models.CharField(max_length=50, blank=True, null=True)  # e.g. "1-10"

    def __str__(self):
        return f"{self.name} ({self.quantity})"
