from rest_framework import viewsets
from dashboard.models.CartValue import CartValue
from dashboard.serializer.cartvalue_serializer import CartValueSerializer

class CartValueViewSet(viewsets.ModelViewSet):
    queryset = CartValue.objects.all().order_by('-created_at')
    serializer_class = CartValueSerializer
