from django.contrib import admin
from .models import *

admin.site.site_header = "Seminar Roulette Administration"


class UniversityUserAdmin(admin.ModelAdmin):
    list_display = ['guid', 'name', 'is_superuser']


admin.site.register(UniversityUser, UniversityUserAdmin)
