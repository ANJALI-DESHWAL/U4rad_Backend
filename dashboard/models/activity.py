from django.db import models
from django.contrib.auth.models import User
from typing import TYPE_CHECKING

class Activity(models.Model):
    ACTION_TYPES = [
        ('login', 'Login'),
        ('logout', 'Logout'),
        ('order_created', 'Order Created'),
        ('calculation_created', 'Calculation Created'),
        ('profile_updated', 'Profile Updated'),
        ('password_changed', 'Password Changed'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    action = models.CharField(max_length=20, choices=ACTION_TYPES)
    description = models.TextField(blank=True)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    if TYPE_CHECKING:
        def get_action_display(self) -> str: ...

    def __str__(self) -> str:
        return f"{self.user.email} - {self.get_action_display()}"
