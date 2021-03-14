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
    """
    Class which handles pulling in data from various event feeds.
    """
    def __init__(self):
        env = environ.Env()
        env_file = os.path.join(os.getcwd(), ".env")
        environ.Env.read_env(env_file)

        if UniversityUser.objects.count() < 10:
            for i in range(1, 11):
                guid = 'user' + str(i)
                user, user_created = UniversityUser.objects.get_or_create(
                    username=guid, guid=guid, name='User ' + str(i)
                )

        self.samoa_feed()
        self.eventbrite_feed(env('EVENTBRITE_KEY'))
        self.generate_ical_events()
        self.generate_keywords()
        self.serves_food()

    # Gets seminar data from Samoa Events
    def samoa_feed(self):
        print('Retrieving event feed from Samoa. Please wait...')

        # Makes get request to events API
        response = requests.get(
            'https://samoa.dcs.gla.ac.uk/events/rest/Event/searchtext?search='
        )
        events = response.json()

        # Loops through each event in response
        for event in events:
            group = event['owningOu']
            seminar_location = event['location']
            online_locations = ['online', 'zoom', 'gather.town']
            online = False

            if any(
                loc in seminar_location['location'].lower()
                for loc in online_locations
            ):
                online = True

            # Creates location model
            location, location_created = Location.objects.get_or_create(
                location=seminar_location['location'],
                latitude=seminar_location['latitude'],
                longitude=seminar_location['longitude'],
                online=online,
            )
            location.directions = seminar_location['directions']
            location.save()

            # Creates seminar group model
            seminar_group, seminar_group_created = SeminarGroup.objects.get_or_create(
                name=group['name'],
            )
            # In case location/description/url changes
            seminar_group.short_name = group['shortname']
            seminar_group.location.add(location)
            seminar_group.description = group['description']
            seminar_group.url = group['url']
            seminar_group.samoa_group_id = group['id']
            seminar_group.save()

            # Creates speaker model
            speaker, speaker_created = Speaker.objects.get_or_create(
                speaker=event['speaker'],
                affiliation=event['speakerAffiliation'],
            )
            if speaker_created:
                speaker.url = event['speakerUrl']
                speaker.save()

            try:
                # Creates seminar model
                seminar, seminar_created = Seminar.objects.get_or_create(
                    samoa_id=event['id']
                )
                # In case any of these fields change
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
                # If error occurs with the data, delete the seminar so that it doesn't cause issues
                seminar.delete()
                continue

        print('Samoa event feed retrieved!')

    # Gets event data from EventBrite API
    def eventbrite_feed(self, key):
        print('Retrieving event feed from Eventbrite. Please wait...')

        # Connects to Python Eventbrite API
        eventbrite = Eventbrite(key)

        # Load organiser IDs from config
        config = yaml.safe_load(open('config.yaml'))
        organisers = config['organisers']

        for organiser_id in organisers:
            # Get Eventbrite events from organiser ID
            organiser = eventbrite.get_organizers(organiser_id)
            organiser_events = eventbrite.get_organizer_events(
                organiser_id, expand='venue'
            )

            # Creates seminar group model
            seminar_group, seminar_group_created = SeminarGroup.objects.get_or_create(
                name=organiser['name']
            )

            if seminar_group_created:
                seminar_group.description = organiser['long_description']['text'
                                                                         ]
                seminar_group.url = organiser['url']
                seminar_group.save()

            # For each event in the organiser's events
            for event in organiser_events['events']:
                now = datetime.datetime.now()
                start = datetime.datetime.strptime(
                    event['start']['local'], '%Y-%m-%dT%H:%M:%S'
                )

                # If event is in the future
                if start >= now:
                    # Creates seminar model
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

                    # If this event has a venue
                    if venue:
                        # Create location model
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

        print('Eventbrite event feed retrieved!')

    # Creates icalendar instance for events
    def generate_ical_events(self):
        print('Generating iCal calendar events. Please wait...')

        # Regex for removing HTML tags from seminar description
        pattern = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')

        # Loop through all events in database
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

            # Create icalendar instance for that event
            seminar.icalendar = str(calendar)
            seminar.save()

        print('iCal calendar events generated!')

    # Generates list of keywords from seminar title and description
    def generate_keywords(self):
        print('Generating seminar keywords. Please wait...')

        pattern = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')

        for seminar in Seminar.objects.all():
            # Tokenize words in seminar title and description
            word_tokens = word_tokenize(
                seminar.title.lower() + ' ' +
                re.sub(pattern, '', seminar.description.lower())
            )

            # Get English stopwords
            stop_words = set(stopwords.words('english'))

            # Array of words that aren't stopwords in seminar title and description
            no_stop_word_desc = [
                word for word in word_tokens if not word in stop_words
            ]

            # Remove punctuation from array above
            no_punctuation_desc = list(
                filter(
                    lambda token: token not in string.punctuation,
                    no_stop_word_desc
                )
            )

            # Count word occurences
            word_occurrences = Counter(no_punctuation_desc)
            seminar_keywords = []

            for occurrence in word_occurrences:
                seminar_keywords.append(
                    {
                        'text': occurrence,
                        'value': word_occurrences[occurrence]
                    }
                )

            # Sort keywords by the number of times that word appears
            sorted_keywords = sorted(
                seminar_keywords, key=lambda x: x['value'], reverse=True
            )

            # Store keywords in seminar model as json
            seminar.keywords = json.dumps(sorted_keywords)
            seminar.save()

        print('Seminar keywords generated!')

    # Set whether seminars serve food or not
    def serves_food(self):
        print('Populating serves food seminar field. Please wait...')

        # Words which are commonly used to describe seminars which serve food
        food_words = ['refreshment', 'breakfast', 'lunch', 'dinner', 'snack']

        for seminar in Seminar.objects.all():
            # If food related word in seminar description
            result = [
                food for food in food_words if (food in seminar.description)
            ]

            seminar.serves_food = bool(result)
            seminar.save()

        print('Serves food field populated!')


if __name__ == '__main__':
    EventFeeds()
