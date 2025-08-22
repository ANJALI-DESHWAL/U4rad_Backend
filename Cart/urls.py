from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Cart.Views.ServiceView import ServiceViewSet
from Cart.Views.CartView import OrderCreateView, OrderDetailView

router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='services')

# Explicit service paths
service_list = ServiceViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
service_detail = ServiceViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    # Service endpoints
    path("services/", service_list, name="service-list"),
    path("services/<int:pk>/", service_detail, name="service-detail"),

    # Cart endpoints
    path("cart/", OrderCreateView.as_view(), name="order-create"),
    path("cart/<str:order_id>/", OrderDetailView.as_view(), name="order-detail"),

    # Router URLs (auto-generated)
    path('', include(router.urls)),
]
