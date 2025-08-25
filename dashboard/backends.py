from django.contrib.auth.backends import ModelBackend
from .models.user import CustomUser

class UserIdBackend(ModelBackend):
    def authenticate(self, request, user_id=None, password=None, **kwargs):
        if user_id is None or password is None:
            return None  # Early return if missing credentials

        try:
            user = CustomUser.objects.get(user_id=user_id)
            if user.check_password(password):  # password is guaranteed str now
                return user
        except CustomUser.DoesNotExist:
            return None
