from django.contrib import admin
from Cart.Models.Cart import Order, OrderService  # Order & OrderService models
from Cart.Models.Services import Service, PriceRange

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

