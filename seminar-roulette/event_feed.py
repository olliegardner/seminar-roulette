import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'seminar-roulette.settings')

import django
django.setup()

from backend.models import *
import requests
import json


class EventFeeds():
    def __init__(self):
        self.samoa_feed()

    def samoa_feed(self):
        print('Retrieving event feed from Samoa. Please wait...')

        # SeminarGroup.objects.all().delete()
        # Location.objects.all().delete()
        # Speaker.objects.all().delete()
        # Seminar.objects.all().delete()

        response = requests.get(
            'https://samoa.dcs.gla.ac.uk/events/rest/Event/searchtext?search='
        )
        events = response.json()

        for event in events:
            group = event['owningOu']
            location = event['location']
            online_locations = ['online', 'zoom', 'gather.town']
            online = False

            if any(
                loc in location['location'].lower() for loc in online_locations
            ):
                online = True

            location, location_created = Location.objects.get_or_create(
                name=location['location'],
                directions=location['directions'],
                latitude=location['latitude'],
                longitude=location['longitude'],
                online=online,
            )

            seminar_group, seminar_group_created = SeminarGroup.objects.get_or_create(
                name=group['name'],
                short_name=group['shortname'],
                location=location,
            )
            # in case description/url changes
            seminar_group.description = group['description']
            seminar_group.url = group['url']
            seminar_group.save()

            print(event['speakerUrl'])

            speaker, speaker_created = Speaker.objects.get_or_create(
                speaker=event['speaker'],
                affiliation=event['speakerAffiliation'],
                url=event['speakerUrl']
            )

            seminar, seminar_created = Seminar.objects.get_or_create(
                title=event['title'],
                description=event['description'],
                registration_url=event['registrationUrl'],
                start_time=event['startTime'],
                end_time=event['endTime'],
                speaker=speaker,
                seminar_group=seminar_group
            )

        print('Samoa event feed retrieved!')


if __name__ == "__main__":
    EventFeeds()
