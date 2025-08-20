from rest_framework import viewsets, permissions
from dashboard.models.activity import Activity
from dashboard.serializer.activityserializer import ActivitySerializer

class ActivityViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows activities to be viewed or created.
    """
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Limit activities so users only see their own.
        Admins see everything.
        """
        user = self.request.user
        if user.is_staff:
            return Activity.objects.all()
        return Activity.objects.filter(user=user).order_by("-timestamp")
