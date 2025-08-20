from django.contrib import admin
from .Models.Services import Service, PriceRange

# Inline so we can edit PriceRange inside Service
class PriceRangeInline(admin.TabularInline):  # or admin.StackedInline
    model = PriceRange
    extra = 1  # number of empty rows shown by default

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    inlines = [PriceRangeInline]  # attach the inline here


@admin.register(PriceRange)
class PriceRangeAdmin(admin.ModelAdmin):
    list_display = ("service", "start_quantity", "end_quantity", "price")
