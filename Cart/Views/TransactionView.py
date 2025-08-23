from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from Cart.Models.Transaction import Transaction
from Cart.Serializer.TransactionSerializer import TransactionSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access
