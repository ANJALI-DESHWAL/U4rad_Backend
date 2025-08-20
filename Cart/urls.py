from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Cart.Views.ServiceView import ServiceViewSet
from Cart.Views.CartView import CartViewSet

router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='services')
router.register(r'carts', CartViewSet, basename='carts')

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
    # Explicit service endpoints
    path("services/", service_list, name="service-list"),
    path("services/<int:pk>/", service_detail, name="service-detail"),

    # Explicit cart endpoint (if needed)
    path("carts/<int:pk>/", CartViewSet.as_view({'get': 'retrieve'}), name="cart-detail"),

    # Router URLs (auto-generated)
    path('', include(router.urls)),
]
