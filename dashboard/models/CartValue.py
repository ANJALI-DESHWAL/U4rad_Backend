from django.db import models
from django.contrib.auth.models import User
from decimal import Decimal

class CartValue(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # required
    promo_code = models.CharField(max_length=100, blank=True, null=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))
    grand_total = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # automatically compute grand_total before saving
        self.grand_total = Decimal(self.total_amount) - Decimal(self.discount)
        if self.grand_total < 0:
            self.grand_total = Decimal("0.00")  # prevent negative totals
        super().save(*args, **kwargs)

    def __str__(self):
        return f"CartValue for {self.user.username} | Grand Total: {self.grand_total}"
