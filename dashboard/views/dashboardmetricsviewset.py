from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from dashboard.models.dashboardmetrics import DashboardMetrics
from dashboard.serializer.dashboardmetricsserializer import DashboardMetricsSerializer


class DashboardMetricsViewSet(viewsets.ModelViewSet):
    """
    ViewSet for DashboardMetrics
    """
    queryset = DashboardMetrics.objects.all()
    serializer_class = DashboardMetricsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return the current user’s metrics
        return DashboardMetrics.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        # validate incoming data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # update or create a single metrics record per user
        metrics, created = DashboardMetrics.objects.update_or_create(
            user=request.user,
            defaults=serializer.validated_data
        )

        # return the updated/created record
        output_serializer = self.get_serializer(metrics)
        return Response(output_serializer.data, status=status.HTTP_200_OK)
