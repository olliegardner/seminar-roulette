import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'seminar-roulette.settings')

import django
django.setup()

from backend.models import *
from eventbrite import Eventbrite
from ics import Calendar, Event
from collections import Counter

import requests
import json
import sys
import environ
import datetime
import yaml
import re
import string

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize


class EventFeeds():
    def __init__(self):
        env = environ.Env()
        env_file = os.path.join(os.getcwd(), ".env")
        environ.Env.read_env(env_file)

        self.samoa_feed()
        self.eventbrite_feed(env('EVENTBRITE_KEY'))
        self.generate_ical_events()
        self.generate_keywords()
        self.serves_food()

    # gets event feed from Samoa
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
            )
            # in case location/description/url changes
            seminar_group.short_name = group['shortname']
            seminar_group.location.add(location)
            seminar_group.description = group['description']
            seminar_group.url = group['url']
            seminar_group.samoa_group_id = group['id']
            seminar_group.save()

            speaker, speaker_created = Speaker.objects.get_or_create(
                speaker=event['speaker'],
                affiliation=event['speakerAffiliation'],
            )
            if speaker_created:
                speaker.url = event['speakerUrl']
                speaker.save()

            try:
                seminar, seminar_created = Seminar.objects.get_or_create(
                    samoa_id=event['id']
                )
                # in case any of these fields change
                seminar.title = event['title']
                seminar.description = event['description']
                seminar.registration_url = event['registrationUrl']
                seminar.start_time = event['startTime']
                seminar.end_time = event['endTime']
                seminar.online = location.online
                seminar.speaker = speaker
                seminar.seminar_group = seminar_group
                seminar.location = location
                seminar.save()
            except Exception:
                seminar.delete()
                continue

        print('Samoa event feed retrieved!')

    # gets event feed from EventBrite
    def eventbrite_feed(self, key):
        print('Retrieving event feed from EventBrite. Please wait...')

        eventbrite = Eventbrite(key)

        config = yaml.safe_load(open('config.yaml'))
        organisers = config['organisers']

        for organiser_id in organisers:
            organiser = eventbrite.get_organizers(organiser_id)
            organiser_events = eventbrite.get_organizer_events(
                organiser_id, expand='venue'
            )

            seminar_group, seminar_group_created = SeminarGroup.objects.get_or_create(
                name=organiser['name']
            )

            if seminar_group_created:
                seminar_group.description = organiser['long_description']['text'
                                                                         ]
                seminar_group.url = organiser['url']
                seminar_group.save()

            for event in organiser_events['events']:
                now = datetime.datetime.now()
                start = datetime.datetime.strptime(
                    event['start']['local'], '%Y-%m-%dT%H:%M:%S'
                )

                if start >= now:  # get future EventBrite events for the organisation
                    seminar, seminar_created = Seminar.objects.get_or_create(
                        eventbrite_id=event['id']
                    )
                    seminar.title = event['name']['text']
                    seminar.description = event['description']['text']
                    seminar.registration_url = event['url']
                    seminar.start_time = event['start']['local']
                    seminar.end_time = event['end']['local']
                    seminar.online = event['online_event']
                    seminar.seminar_group = seminar_group

                    venue = event['venue']

                    if venue:
                        location, location_created = Location.objects.get_or_create(
                            location=venue['name'],
                            latitude=venue['latitude'],
                            longitude=venue['longitude'],
                            online=event['online_event'],
                        )

                        seminar.location = location
                        seminar_group.location.add(location)

                    seminar.save()
                    seminar_group.save()

        print('EventBrite event feed retrieved!')

    # gets iCal-format calendar feed for events
    def generate_ical_events(self):
        print('Generating iCal calendar events. Please wait...')

        pattern = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')

        for seminar in Seminar.objects.all():
            calendar = Calendar()

            event = Event(
                name=seminar.title,
                begin=seminar.start_time,
                end=seminar.end_time,
                description=pattern.sub('', seminar.description),
                url=seminar.registration_url
            )

            if seminar.location:
                event.location = seminar.location.location

            calendar.events.add(event)

            seminar.icalendar = str(calendar)
            seminar.save()

        print('iCal calendar events generated!')

    # generates list of keywords from seminar title and description
    def generate_keywords(self):
        print('Generating seminar keywords. Please wait...')

        pattern = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')

        for seminar in Seminar.objects.all():
            word_tokens = word_tokenize(
                seminar.title.lower() + ' ' +
                re.sub(pattern, '', seminar.description.lower())
            )

            stop_words = set(stopwords.words('english'))

            no_stop_word_desc = [
                word for word in word_tokens if not word in stop_words
            ]

            no_punctuation_desc = list(
                filter(
                    lambda token: token not in string.punctuation,
                    no_stop_word_desc
                )
            )

            word_occurrences = Counter(no_punctuation_desc)
            seminar_keywords = []

            for occurrence in word_occurrences:
                seminar_keywords.append(
                    {
                        'text': occurrence,
                        'value': word_occurrences[occurrence]
                    }
                )

            sorted_keywords = sorted(
                seminar_keywords, key=lambda x: x['value'], reverse=True
            )

            seminar.keywords = json.dumps(sorted_keywords)
            seminar.save()

        print('Seminar keywords generated!')

    # set whether the seminar serves food or not
    def serves_food(self):
        print('Populating serves food seminar field. Please wait...')

        food_words = ['refreshment', 'breakfast', 'lunch', 'dinner', 'snack']

        for seminar in Seminar.objects.all():
            result = [
                food for food in food_words if (food in seminar.description)
            ]

            seminar.serves_food = bool(result)
            seminar.save()

        print('Serves food field populated!')


if __name__ == '__main__':
    EventFeeds()
