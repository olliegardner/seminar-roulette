from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UniversityUser
        fields = '__all__'


class SpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speaker
        fields = ('speaker', 'affiliation', 'url')


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('location', 'directions', 'latitude', 'longitude', 'online')


class SeminarGroupSerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = SeminarGroup
        fields = ('name', 'short_name', 'description', 'url', 'location')


class SeminarSerializer(serializers.ModelSerializer):
    speaker = SpeakerSerializer()
    seminar_group = SeminarGroupSerializer()
    location = LocationSerializer()

    class Meta:
        model = Seminar
        fields = (
            'id', 'title', 'description', 'registration_url', 'start_time',
            'end_time', 'speaker', 'seminar_group', 'location', 'samoa_id'
        )


class SeminarHistorySerializer(serializers.ModelSerializer):
    seminar = SeminarSerializer()
    user = UserSerializer()

    class Meta:
        model = SeminarHistory
        fields = ('seminar', 'user', 'attended', 'rating', 'discarded')