from rest_framework import viewsets
from Cart.Models.Cart import Cart
from Cart.Serializer.CartSerializer import CartSerializer


class CartViewSet(viewsets.ModelViewSet):
    """
    API endpoint for viewing and editing carts
    """
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
