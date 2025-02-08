from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    is_ldap_user = models.BooleanField(default=False)
    employee_number = models.IntegerField(unique=True, null=True, blank=True)