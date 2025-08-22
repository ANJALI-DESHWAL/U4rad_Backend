from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, AllowAny
from Cart.Models.PromoCode import PromoCode
from Cart.Serializer.PromoCodeSerializer import PromoCodeSerializer, PromoCodeCreateSerializer


class PromoCodeViewSet(viewsets.ModelViewSet):
    queryset = PromoCode.objects.all()
    lookup_field = "code"  # lookup by code instead of ID

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return PromoCodeCreateSerializer
        return PromoCodeSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAdminUser()]
        return [AllowAny()]
