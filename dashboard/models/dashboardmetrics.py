from django.db import models
from django.conf import settings   # ✅ use this instead of importing User
from decimal import Decimal


class DashboardMetrics(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,   # ✅ swapped
        on_delete=models.CASCADE,
        related_name='dashboard_metrics'
    )
    total_orders = models.IntegerField(default=0)
    total_spent = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    total_calculations = models.IntegerField(default=0)
    last_login = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return f"{self.user.email} - Dashboard Metrics"
