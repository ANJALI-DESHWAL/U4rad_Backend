from rest_framework.generics import CreateAPIView, RetrieveAPIView
from Cart.Models.Cart import Order
from Cart.Serializer.CartSerializer import OrderCreateSerializer, OrderSerializer


class OrderCreateView(CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderCreateSerializer


class OrderDetailView(RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = "order_id"
