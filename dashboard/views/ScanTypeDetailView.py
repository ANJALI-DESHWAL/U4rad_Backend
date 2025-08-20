from rest_framework import generics
from dashboard.models.ScanType import ScanType
from dashboard.serializer.ScanTypeSerializer import ScanTypeSerializer


# List all scan types or create a new one
class ScanTypeListCreateView(generics.ListCreateAPIView):
    queryset = ScanType.objects.all()
    serializer_class = ScanTypeSerializer


# Retrieve, update, or delete a specific scan type
class ScanTypeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ScanType.objects.all()
    serializer_class = ScanTypeSerializer
