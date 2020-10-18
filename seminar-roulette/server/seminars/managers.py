from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class UniversityUserManager(BaseUserManager):
    """
    Custom user manager that uses guid as identifier
    """
    def create_user(self, guid, password, **extra_fields):
        """
        Create a user instance and save to db
        """
        if not guid:
            raise ValueError(_('GUID must be set'))
        user = self.model(guid=guid, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_staff(self, guid, password, **extra_fields):
        """
        Create a standard administrative user with given details
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Staff must have is_staff=True'))
        if extra_fields.get('is_superuser') is True:
            raise ValueError(_('Staff must not have is_superuser=True'))
        return self.create_user(guid, password, **extra_fields)

    def create_superuser(self, guid, password, **extra_fields):
        """
        Create an administrative super user with given details
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True'))
        return self.create_user(guid, password, **extra_fields)
