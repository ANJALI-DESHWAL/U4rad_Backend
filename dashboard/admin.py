from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from dashboard.models.dashboardmetrics import  DashboardMetrics
from dashboard.models.user import CustomUser
from dashboard.models.Account import Account
from dashboard.models.TopUpTransaction import TopUpTransaction
from dashboard.models.ScanType import ScanType
from dashboard.models.RecentActivity import RecentActivity
from dashboard.models.RateCard import RateCard
# from dashboard.models import ScanType, RecentActivity, RateCard

# ----------------------------
# Custom User Admin
# ----------------------------
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'is_staff', 'is_active')
    search_fields = ('email', 'username')
    ordering = ('email',)

# ----------------------------
# TopUpTransaction Admin Inline for Account
# ----------------------------
class TopUpTransactionInline(admin.TabularInline):
    model = TopUpTransaction
    extra = 1
    readonly_fields = ('created_at',)

# ----------------------------
# Account Admin
# ----------------------------
@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('total_amount_paid', 'current_balance')
    inlines = [TopUpTransactionInline]

# ----------------------------
# TopUpTransaction Admin (Optional)
# ----------------------------
@admin.register(TopUpTransaction)
class TopUpTransactionAdmin(admin.ModelAdmin):
    list_display = ('account', 'amount', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('account__id',)

# ----------------------------
# ScanType Admin
# ----------------------------
@admin.register(ScanType)
class ScanTypeAdmin(admin.ModelAdmin):
    list_display = ('scan_type', 'expected', 'completed', 'balance')
    list_filter = ('scan_type',)
    search_fields = ('scan_type',)

# ----------------------------
# RecentActivity Admin
# ----------------------------
@admin.register(RecentActivity)
class RecentActivityAdmin(admin.ModelAdmin):
    list_display = ('scan_type', 'description', 'scans_count', 'status', 'timestamp')
    list_filter = ('status', 'scan_type')
    search_fields = ('description',)

# ----------------------------
# RateCard Admin
# ----------------------------
@admin.register(RateCard)
class RateCardAdmin(admin.ModelAdmin):
    list_display = ('name', 'price_per_scan')
    search_fields = ('name',)

# ----------------------------
# DashboardMetrics Admin
# ----------------------------
@admin.register(DashboardMetrics)
class DashboardMetricsAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_orders', 'total_spent', 'total_calculations', 'last_login')
    search_fields = ('user__user_id',)

# ----------------------------
# Register CustomUser
# ----------------------------
admin.site.register(CustomUser, CustomUserAdmin)
