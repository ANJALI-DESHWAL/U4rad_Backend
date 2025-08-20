from rest_framework import generics
from dashboard.models.RateCard import RateCard
from dashboard.serializer.RateCardSerializer import RateCardSerializer


# List all RateCards or create a new one
class RateCardListCreateView(generics.ListCreateAPIView):
    queryset = RateCard.objects.all()
    serializer_class = RateCardSerializer


# Retrieve, update, or delete a specific RateCard
class RateCardDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RateCard.objects.all()
    serializer_class = RateCardSerializer
