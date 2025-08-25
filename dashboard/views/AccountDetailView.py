from rest_framework import generics
from dashboard.models.Account import Account
from dashboard.serializer.AccountSerializer import AccountSerializer


# List all accounts or create a new account
class AccountListCreateView(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


# Retrieve, update, or delete a single account
class AccountDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
