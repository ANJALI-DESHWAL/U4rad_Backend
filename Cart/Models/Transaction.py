from django.db import models
from django.conf import settings   # ✅ use this instead of importing User
from Cart.Models.Services import Service  # Adjust if Service is in another app
from decimal import Decimal


class Transaction(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,   # ✅ swapped
        on_delete=models.CASCADE,
        related_name="transactions"
    )
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="transactions")
    quantity = models.PositiveIntegerField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # price per unit
    promo_code = models.CharField(max_length=50, blank=True, null=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)  # quantity * amount
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))
    grand_total = models.DecimalField(max_digits=10, decimal_places=2)  # total_amount - discount
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=50)  # e.g., pending, completed, failed
    provider_order_id = models.CharField(max_length=100, unique=True)
    payment_id = models.CharField(max_length=100, unique=True)
    signature_id = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transaction {self.provider_order_id} by {self.user.username}"

    def save(self, *args, **kwargs):
        # Auto-calculate total_amount and grand_total
        self.total_amount = self.amount * self.quantity
        self.grand_total = self.total_amount - self.discount
        super().save(*args, **kwargs)
