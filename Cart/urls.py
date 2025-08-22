from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Cart.Views.ServiceView import ServiceViewSet
from Cart.Views.CartView import OrderCreateView, OrderDetailView
from Cart.Views.PromoCodeView import PromoCodeViewSet

router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='services')
router.register("promocodes", PromoCodeViewSet, basename="promocode")

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

# ✅ Explicit promo code paths
promocode_list = PromoCodeViewSet.as_view({
    "get": "list",
    "post": "create"
})
promocode_detail = PromoCodeViewSet.as_view({
    "get": "retrieve",
    "put": "update",
    "patch": "partial_update",
    "delete": "destroy"
})

urlpatterns = [
    # Service endpoints
    path("services/", service_list, name="service-list"),
    path("services/<int:pk>/", service_detail, name="service-detail"),

    # Cart endpoints
    path("cart/", OrderCreateView.as_view(), name="order-create"),
    path("cart/<str:order_id>/", OrderDetailView.as_view(), name="order-detail"),
    
    # PromoCode endpoints
    path("promocodes/", promocode_list, name="promocode-list"),
    path("promocodes/<str:code>/", promocode_detail, name="promocode-detail"),

    # Router URLs (auto-generated, optional)
    path('', include(router.urls)),
]
