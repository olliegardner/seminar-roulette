from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models import Q
from django.utils import timezone

from .managers import UniversityUserManager


# User model, taking attributes from the single sign-on (Shibboleth login system
class UniversityUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    guid = models.CharField(max_length=12, unique=True, primary_key=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    interests = ArrayField(
        models.CharField(max_length=100),
        size=5,
        default=list,
        null=True,
        blank=True
    )
    dark_theme_enabled = models.BooleanField(default=False)

    USERNAME_FIELD = 'guid'
    REQUIRED_FIELDS = []

    objects = UniversityUserManager()

    def __str__(self):
        return self.guid


# Location of the seminar
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


# Group hosting/responsible for the seminar
class SeminarGroup(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    short_name = models.CharField(max_length=50, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    url = models.URLField(max_length=1000, null=True, blank=True)
    location = models.ManyToManyField(Location, blank=True)
    samoa_group_id = models.IntegerField(null=True, blank=True, unique=True)

    class Meta:
        unique_together = ['name', 'short_name']

    def __str__(self):
        return self.name


# Person hosting the seminar
class Speaker(models.Model):
    speaker = models.CharField(max_length=255, null=False, blank=False)
    affiliation = models.CharField(max_length=255, null=True, blank=True)
    url = models.URLField(max_length=1000, null=True, blank=True)

    class Meta:
        unique_together = ['speaker', 'affiliation']

    def __str__(self):
        return self.speaker + ' from ' + self.affiliation


# Model storing details about the seminar event
class Seminar(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    registration_url = models.URLField(max_length=1000, null=True, blank=True)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    online = models.BooleanField(default=False)
    serves_food = models.BooleanField(default=False)
    speaker = models.ForeignKey(Speaker, on_delete=models.CASCADE, null=True)
    seminar_group = models.ForeignKey(
        SeminarGroup, on_delete=models.CASCADE, null=True
    )
    location = models.ForeignKey(Location, on_delete=models.CASCADE, null=True)
    samoa_id = models.IntegerField(null=True, blank=True, unique=True)
    eventbrite_id = models.BigIntegerField(null=True, blank=True, unique=True)
    icalendar = models.TextField(null=True, blank=True)
    keywords = models.JSONField(null=True, blank=True)

    class Meta:
        unique_together = ['title', 'start_time', 'end_time', 'speaker']

    @property
    def is_future(self):
        return self.start_time >= timezone.now()

    def __str__(self):
        return self.title


# Seminar which user has previously attended, rated or discarded
class SeminarHistory(models.Model):
    seminar = models.ForeignKey(Seminar, on_delete=models.CASCADE)
    user = models.ForeignKey(UniversityUser, on_delete=models.CASCADE)
    attended = models.BooleanField(default=False)
    rating = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=1,
        max_digits=2,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5),
        ]
    )
    discarded = models.BooleanField(default=False)

    class Meta:
        unique_together = ['seminar', 'user']
        verbose_name_plural = 'seminar histories'

    def __str__(self):
        return str(self.seminar) + ' - ' + str(self.user)


# Keeps track of the status of nightly cron job which pulls in data
class CronJob(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    success = models.BooleanField(default=False)
    error_message = models.TextField(null=True, blank=True)

    def __str__(self):
        return str(self.timestamp)
