from django.contrib import admin
from django.contrib import admin
from dashboard.models.dashboardmetrics import DashboardMetrics

@admin.register(DashboardMetrics)
class DashboardMetricsAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_orders', 'total_spent', 'total_calculations', 'last_login', 'created_at')
    search_fields = ('user__email',)
