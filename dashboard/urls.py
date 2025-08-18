from rest_framework.routers import DefaultRouter
from django.urls import path, include
from dashboard.views.dashboardmetricsviewset import DashboardMetricsViewSet

router = DefaultRouter()
router.register(r'dashboard-metrics', DashboardMetricsViewSet, basename='dashboardmetrics')

urlpatterns = [
    path('', include(router.urls)),
]
