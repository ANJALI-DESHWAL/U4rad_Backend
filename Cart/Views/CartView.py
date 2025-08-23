from rest_framework.generics import CreateAPIView, RetrieveAPIView
from Cart.Models.Cart import Order
from Cart.Serializer.CartSerializer import OrderCreateSerializer, OrderSerializer
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView
# ----------------------------
# Create a new order (POST)
# ----------------------------
class OrderCreateView(CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderCreateSerializer


# ----------------------------
# Retrieve order details by order_id (GET)
# ----------------------------
class OrderDetailView(RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = "order_id"  # use order_id instead of pk

class UserOrderListView(ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Order.objects.filter(client__user_id=user_id)