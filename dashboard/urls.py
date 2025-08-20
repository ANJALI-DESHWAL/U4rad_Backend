from django.urls import path, include
from rest_framework.routers import DefaultRouter
from dashboard.views.dashboardmetricsviewset import DashboardMetricsViewSet
#from dashboard.views.notifications import NotificationViewSet
#from dashboard.views.activity import ActivityViewSet
from dashboard.views.userview import LoginAPIView
#from dashboard.views.Service import ServiceViewSet, ServiceRateViewSet 
#from dashboard.views.cartvalue_view import CartValueViewSet
from dashboard.views.AccountDetailView import AccountListCreateView, AccountDetailView
from dashboard.views.RateCardView import RateCardListCreateView, RateCardDetailView
from dashboard.views.TopUpTransaction import TopUpTransactionListCreateView, TopUpTransactionDetailView
from dashboard.views.ScanTypeDetailView import ScanTypeListCreateView, ScanTypeDetailView
from dashboard.views.recent_activity_view import (
    RecentActivityListCreateView,
    RecentActivityDetailView,
)

router = DefaultRouter()
router.register(r'dashboard-metrics', DashboardMetricsViewSet, basename='dashboard-metrics')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginAPIView.as_view(), name='login'),
    path("accounts/", AccountListCreateView.as_view(), name="account-list-create"),
    path("accounts/<int:pk>/", AccountDetailView.as_view(), name="account-detail"),
    path("ratecards/", RateCardListCreateView.as_view(), name="ratecard-list-create"),
    path("ratecards/<int:pk>/", RateCardDetailView.as_view(), name="ratecard-detail"),
    path("topups/", TopUpTransactionListCreateView.as_view(), name="topup-list-create"),
    path("topups/<int:pk>/", TopUpTransactionDetailView.as_view(), name="topup-detail"),
    path("scans/", ScanTypeListCreateView.as_view(), name="scantype-list-create"),
    path("scans/<int:pk>/", ScanTypeDetailView.as_view(), name="scantype-detail"),
    path("recent-activities/", RecentActivityListCreateView.as_view(), name="recent-activity-list"),
    path("recent-activities/<int:pk>/", RecentActivityDetailView.as_view(), name="recent-activity-detail"),
    

]


