from django.db import models


class Service(models.Model):
    name = models.CharField(max_length=100)  # e.g. "XRay"

    def __str__(self):
        return self.name


class PriceRange(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="price_ranges")
    start_quantity = models.IntegerField()
    end_quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.service.name}: {self.start_quantity}-{self.end_quantity} -> {self.price}"
