from rest_framework import generics
from dashboard.models.RecentActivity import RecentActivity
from dashboard.serializer.RecentActivitySerializer import RecentActivitySerializer


class RecentActivityListCreateView(generics.ListCreateAPIView):
    queryset = RecentActivity.objects.all().order_by("-timestamp")
    serializer_class = RecentActivitySerializer


class RecentActivityDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RecentActivity.objects.all()
    serializer_class = RecentActivitySerializer
