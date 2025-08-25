from typing import cast
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from dashboard.serializer.userserializer import LoginSerializer, UserSerializer
from dashboard.models.user import CustomUser


class LoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data or {}
            user = validated_data.get('user')  # ✅ now works because serializer returns dict with "user"
            
            if user is not None:
                refresh = RefreshToken.for_user(user)
                return Response({
                    "id": user.id,
                    "email": user.email,
                    "username": user.username,
                    "phone": user.phone,
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                }, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
