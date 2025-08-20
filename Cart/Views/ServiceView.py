from Cart.Models.Services import Service
from Cart.Serializer.ServiceSerializer import ServiceSerializer
from rest_framework import viewsets


class ServiceViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Services.
    """
    queryset = Service.objects.all()   # ✅ use the class here
    serializer_class = ServiceSerializer
