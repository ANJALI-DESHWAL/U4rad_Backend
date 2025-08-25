from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Cart.Views.ServiceView import ServiceViewSet
from Cart.Views.CartView import OrderCreateView, OrderDetailView, UserOrderListView
from Cart.Views.PromoCodeView import PromoCodeViewSet
from Cart.Views.TransactionView import TransactionViewSet  # <-- correct import

# Router for services, promo codes, and transactions
router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='services')
router.register(r'promocodes', PromoCodeViewSet, basename='promocode')
router.register(r'transactions', TransactionViewSet, basename='transaction')

# Explicit service paths
service_list = ServiceViewSet.as_view({'get': 'list', 'post': 'create'})
service_detail = ServiceViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})

# Explicit promo code paths
promocode_list = PromoCodeViewSet.as_view({"get": "list", "post": "create"})
promocode_detail = PromoCodeViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"})

# Explicit transaction paths
transaction_list = TransactionViewSet.as_view({"get": "list", "post": "create"})
transaction_detail = TransactionViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"})

urlpatterns = [
    # Service endpoints
    path("services/", service_list, name="service-list"),
    path("services/<int:pk>/", service_detail, name="service-detail"),

    # Cart endpoints

    path("cart/", OrderCreateView.as_view(), name="order-create"),            # POST
    path("cart/<str:email>/", UserOrderListView.as_view(), name="user-order-list"),
    path("cart/", OrderCreateView.as_view(), name="order-create"),
    path("cart/<str:user_id>/", UserOrderListView.as_view(), name="user-order-list"),


    # PromoCode endpoints
    path("promocodes/", promocode_list, name="promocode-list"),
    path("promocodes/<str:code>/", promocode_detail, name="promocode-detail"),

    # Transaction endpoints
    path("transactions/", transaction_list, name="transaction-list"),
    path("transactions/<int:pk>/", transaction_detail, name="transaction-detail"),

    # Include router URLs
    path('', include(router.urls)),
]
