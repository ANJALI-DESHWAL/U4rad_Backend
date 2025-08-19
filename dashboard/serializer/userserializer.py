from rest_framework import serializers
from django.contrib.auth import authenticate
from dashboard.models.user import CustomUser


class LoginSerializer(serializers.Serializer):
    user_id = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        # authenticate will use AUTH_USER_MODEL = CustomUser
        user = authenticate(user_id=data['user_id'], password=data['password'])
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid ID or Password")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'user_id']
