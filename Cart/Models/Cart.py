from django.db import models
from decimal import Decimal
from dashboard.models.user import CustomUser
from Cart.Models.Services import Service  # Ensure Service model exists in Services.py

class Order(models.Model):
    client = models.ForeignKey(CustomUser, related_name="orders", on_delete=models.CASCADE)
    order_id = models.CharField(max_length=50, unique=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    discount = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    grand_total = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    payment_status = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.order_id} - {self.client.user_id}"


class OrderService(models.Model):
    order = models.ForeignKey(Order, related_name="services", on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    amount = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.service.name} x {self.quantity}"
