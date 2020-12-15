from django.contrib import admin
from .models import *

admin.site.site_header = "Seminar Roulette Administration"


class UniversityUserAdmin(admin.ModelAdmin):
    list_display = ['guid', 'name', 'is_superuser']


class SeminarGroupAdmin(admin.ModelAdmin):
    list_display = ['name', 'short_name']
    readonly_fields = ('url', )


class LocationAdmin(admin.ModelAdmin):
    list_display = ['location', 'latitude', 'longitude', 'online']
    readonly_fields = ('directions', )


class SpeakerAdmin(admin.ModelAdmin):
    list_display = ['speaker', 'affiliation']
    readonly_fields = ('url', )


class SeminarAdmin(admin.ModelAdmin):
    list_display = ['title', 'start_time', 'end_time', 'speaker']
    readonly_fields = (
        'description',
        'registration_url',
        'serves_food',
    )


class SeminarHistoryAdmin(admin.ModelAdmin):
    list_display = ['seminar', 'user', 'attended', 'rating', 'discarded']


class CronJobAdmin(admin.ModelAdmin):
    list_display = ['timestamp', 'success', 'error_message']
    readonly_fields = (
        'timestamp',
        'error_message',
    )


admin.site.register(UniversityUser, UniversityUserAdmin)
admin.site.register(SeminarGroup, SeminarGroupAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Speaker, SpeakerAdmin)
admin.site.register(Seminar, SeminarAdmin)
admin.site.register(SeminarHistory, SeminarHistoryAdmin)
admin.site.register(CronJob, CronJobAdmin)