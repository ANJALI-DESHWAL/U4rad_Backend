from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from dashboard.models.dashboardmetrics import  DashboardMetrics
from dashboard.models.user import CustomUser
from dashboard.models.account import Account
from dashboard.models.TopUpTransaction import TopUpTransaction
from dashboard.models.ScanType import ScanType
from dashboard.models.RecentActivity import RecentActivity
from dashboard.models.RateCard import RateCard
# from dashboard.models import ScanType, RecentActivity, RateCard

# ----------------------------
# Custom User Admin
# ----------------------------
class CustomUserAdmin(BaseUserAdmin):
    list_display = ('user_id', 'is_admin', 'is_active')
    list_filter = ('is_admin', 'is_active')
    search_fields = ('user_id',)
    ordering = ('user_id',)
    fieldsets = (
        (None, {'fields': ('user_id', 'password')}),
        ('Permissions', {'fields': ('is_admin', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('user_id', 'password1', 'password2', 'is_admin', 'is_active')}
        ),
    )
    filter_horizontal = ()

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
