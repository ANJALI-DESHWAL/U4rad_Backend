from django.db import models
from decimal import Decimal
from Cart.Models.Services import Service

class Cart(models.Model):
    user_id = models.CharField(max_length=100)  # can link with auth.User later
    services = models.ManyToManyField(Service, related_name="carts")
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))

    def __str__(self):
        return f"Cart for {self.user_id}"
