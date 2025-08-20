from django.db import models
from decimal import Decimal


class RateCard(models.Model):
    name = models.CharField(max_length=100)  # e.g., X-Ray, CT, MRI
    price_per_scan = models.DecimalField(max_digits=8, decimal_places=2, default=Decimal("0.00"))

    def __str__(self):
        return self.name
