import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'seminar-roulette.settings')

import django
django.setup()

from backend.models import *
import requests
import json
import sys
import re


class EventFeeds():
    def __init__(self):
        command_help = 'python event_feed.py [delete, samoa]'

        if len(sys.argv) == 2:
            if sys.argv[1] == 'delete':
                self.delete_data()
            elif sys.argv[1] == 'samoa':
                self.samoa_feed()
            else:
                print(command_help)
        else:
            print(command_help)

    def delete_data(self):
        print('Deleting all data. Please wait...')

        SeminarGroup.objects.all().delete()
        Location.objects.all().delete()
        Speaker.objects.all().delete()
        Seminar.objects.all().delete()

        print('Data deleted!')

    def samoa_feed(self):
        print('Retrieving event feed from Samoa. Please wait...')

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
                location=location['location'],
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

            speaker, speaker_created = Speaker.objects.get_or_create(
                speaker=event['speaker'],
                affiliation=event['speakerAffiliation'],
            )
            if speaker_created:
                speaker.url = event['speakerUrl']
                speaker.save()

            seminar, seminar_created = Seminar.objects.get_or_create(
                samoa_id=event['id']
            )
            # in case any of these fields change
            seminar.title = event['title']

            # remove html tags from description
            pattern = re.compile(
                '<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});'
            )
            clean_description = re.sub(pattern, '', event['description'])

            seminar.description = clean_description
            seminar.registration_url = event['registrationUrl']
            seminar.start_time = event['startTime']
            seminar.end_time = event['endTime']
            seminar.speaker = speaker
            seminar.seminar_group = seminar_group
            seminar.location = location
            seminar.save()

        print('Samoa event feed retrieved!')


if __name__ == "__main__":
    EventFeeds()
