from django.db import models
from decimal import Decimal
from dashboard.models.account import Account  # make sure Account is in the same app


class TopUpTransaction(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="topups")
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"TopUp {self.amount} on {self.created_at}"
