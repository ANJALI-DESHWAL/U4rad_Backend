from rest_framework import viewsets
from Cart.Models.Services import Service
from Cart.Serializer.ServiceSerializer import ServiceSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
