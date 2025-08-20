from django.db import models

class Service(models.Model):
    service_name = models.CharField(max_length=255)

    def __str__(self):
        return self.service_name


class ServiceRate(models.Model):
    service = models.ForeignKey(Service, related_name="rates", on_delete=models.CASCADE)
    min_quantity = models.PositiveIntegerField()
    max_quantity = models.PositiveIntegerField()
    rate = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.service.service_name}: {self.min_quantity}-{self.max_quantity} @ {self.rate}"
