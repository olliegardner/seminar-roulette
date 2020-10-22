from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from .managers import UniversityUserManager


# user model, taking attributes from the university Shibboleth login system
class UniversityUser(AbstractBaseUser, PermissionsMixin):
    guid = models.CharField(max_length=12, unique=True, primary_key=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'guid'
    REQUIRED_FIELDS = []

    objects = UniversityUserManager()

    def __str__(self):
        return self.guid


# location of the seminar
class Location(models.Model):
    location = models.CharField(max_length=255, null=False, blank=False)
    directions = models.TextField(null=True, blank=True)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    online = models.BooleanField(default=False)

    class Meta:
        unique_together = ['location', 'latitude', 'longitude']

    def __str__(self):
        return self.location


# seminar hosting group
class SeminarGroup(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    short_name = models.CharField(max_length=50, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    url = models.URLField(max_length=1000, null=True, blank=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['name', 'location']

    def __str__(self):
        return self.name


# speaker of a seminar
class Speaker(models.Model):
    speaker = models.CharField(max_length=255, null=False, blank=False)
    affiliation = models.CharField(max_length=255, null=True, blank=True)
    url = models.URLField(max_length=1000, null=True, blank=True)

    class Meta:
        unique_together = ['speaker', 'affiliation']

    def __str__(self):
        return self.speaker + ' from ' + self.affiliation


# seminar event
class Seminar(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    registration_url = models.URLField(max_length=1000, null=True, blank=True)
    start_time = models.DateTimeField(null=False, blank=False)
    end_time = models.DateTimeField(null=False, blank=False)
    speaker = models.ForeignKey(Speaker, on_delete=models.CASCADE)
    seminar_group = models.ForeignKey(SeminarGroup, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['title', 'start_time', 'end_time', 'speaker']

    def __str__(self):
        return self.title + ' ' + str(self.start_time
                                     ) + '-' + str(self.end_time)
