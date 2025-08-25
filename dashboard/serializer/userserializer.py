from rest_framework import serializers
from django.contrib.auth import authenticate
from dashboard.models.user import CustomUser


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        # Try to authenticate with email and password
        user = authenticate(email=data['email'], password=data['password'])
        if user and user.is_active:
            return {"user": user}   # ✅ return dict, not user directly
        raise serializers.ValidationError("Invalid Email or Password")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'email',
            'username',
            'phone',
            'is_active',
            'is_staff'
        ]
