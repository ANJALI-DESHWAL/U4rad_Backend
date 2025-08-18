from rest_framework import viewsets, permissions
from dashboard.models.dashboardmetrics import DashboardMetrics
from dashboard.serializer.dashboardmetricsserializer import DashboardMetricsSerializer

class DashboardMetricsViewSet(viewsets.ModelViewSet):
    """
    ViewSet for DashboardMetrics
    """
    queryset = DashboardMetrics.objects.all()
    serializer_class = DashboardMetricsSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can access

    def perform_create(self, serializer):
        # Automatically set the user to the logged-in user
        serializer.save(user=self.request.user)
