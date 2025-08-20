from rest_framework import generics
from dashboard.models.TopUpTransaction import TopUpTransaction
from dashboard.serializer.TopUpTransactionSerializer import TopUpTransactionSerializer


# List all top-ups or create a new one
class TopUpTransactionListCreateView(generics.ListCreateAPIView):
    queryset = TopUpTransaction.objects.all()
    serializer_class = TopUpTransactionSerializer


# Retrieve, update, or delete a specific top-up
class TopUpTransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TopUpTransaction.objects.all()
    serializer_class = TopUpTransactionSerializer
