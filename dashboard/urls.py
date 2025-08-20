from django.urls import path, include
from rest_framework.routers import DefaultRouter
from dashboard.views.dashboardmetricsviewset import DashboardMetricsViewSet
from dashboard.views.notifications import NotificationViewSet
from dashboard.views.activity import ActivityViewSet
from dashboard.views.userview import LoginAPIView
from dashboard.views.Service import ServiceViewSet, ServiceRateViewSet 
from dashboard.views.cartvalue_view import CartValueViewSet

router = DefaultRouter()
router.register(r'dashboard-metrics', DashboardMetricsViewSet, basename='dashboardmetrics')
router.register(r'notifications', NotificationViewSet, basename='notifications')
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'services', ServiceViewSet)
router.register(r'rates', ServiceRateViewSet)
router.register(r'cart-values', CartValueViewSet, basename='cartvalue')
urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginAPIView.as_view(), name='login'),
]


