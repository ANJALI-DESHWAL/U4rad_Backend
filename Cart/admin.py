from django.contrib import admin
from Cart.Models.Cart import Order, OrderService  # Order & OrderService models
from Cart.Models.Services import Service, PriceRange
from Cart.Models.PromoCode import PromoCode
# --------------------------
# PriceRange Inline inside Service
# --------------------------
class PriceRangeInline(admin.TabularInline):
    model = PriceRange
    extra = 1  # show 1 extra empty row by default

# --------------------------
# Service Admin
# --------------------------
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    inlines = [PriceRangeInline]  # attach PriceRange inline

# --------------------------
# PriceRange Admin
# --------------------------
@admin.register(PriceRange)
class PriceRangeAdmin(admin.ModelAdmin):
    list_display = ("service", "start_quantity", "end_quantity", "price")
    search_fields = ("service__name",)

# --------------------------
# OrderService Inline inside Order
# --------------------------
class OrderServiceInline(admin.TabularInline):
    model = OrderService
    extra = 1
    fields = ["service", "quantity", "amount"]

# --------------------------
# Order Admin
# --------------------------
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("order_id", "client", "total_amount", "discount", "grand_total", "payment_status")
    search_fields = ("order_id", "client__user_id")  # allow searching by user_id
    inlines = [OrderServiceInline]
    autocomplete_fields = ("client",)

# --------------------------promocode admin --------------------------
@admin.register(PromoCode)
class PromoCodeAdmin(admin.ModelAdmin):
    list_display = ("code", "discount_percentage", "valid_from", "valid_to", "active", "is_valid")
    list_filter = ("active", "valid_from", "valid_to")
    search_fields = ("code",)
    ordering = ("-valid_from",)

    def is_valid(self, obj):
        return obj.is_valid()
    is_valid.boolean = True

#--------------------------Transaction Admin --------------------------
from Cart.Models.Transaction import Transaction # Import the Transaction model
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ("provider_order_id", "user", "service", "quantity", "amount", "promo_code", "total_amount", "discount", "grand_total", "status", "created_at")
    search_fields = ("provider_order_id", "payment_id", "signature_id", "user__username")
    list_filter = ("status", "created_at")
    ordering = ("-created_at",)
    readonly_fields = ("created_at",)