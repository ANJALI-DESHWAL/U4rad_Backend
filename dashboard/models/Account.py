from django.db import models
from decimal import Decimal   # ✅ import Decimal


class Account(models.Model):
    total_amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))
    current_balance = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))

    def __str__(self):
        return f"Account - Paid: {self.total_amount_paid}, Balance: {self.current_balance}"
