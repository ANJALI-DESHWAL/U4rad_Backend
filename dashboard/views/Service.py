from rest_framework import viewsets
from dashboard.models.ServiceRate import Service
from dashboard.models.ServiceRate import ServiceRate
from dashboard.serializer.ServiceRateSerializer import ServiceRateSerializer
from dashboard.serializer.ServiceRateSerializer import ServiceRateSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceRateSerializer


class ServiceRateViewSet(viewsets.ModelViewSet):
    queryset = ServiceRate.objects.all()
    serializer_class = ServiceRateSerializer

