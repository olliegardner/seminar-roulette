from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from .managers import UniversityUserManager


# user model, taking attributes from the university Shibboleth login system
class UniversityUser(AbstractBaseUser, PermissionsMixin):
    guid = models.CharField(max_length=12, unique=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'guid'
    REQUIRED_FIELDS = []

    objects = UniversityUserManager()

    def __str__(self):
        return self.guid
