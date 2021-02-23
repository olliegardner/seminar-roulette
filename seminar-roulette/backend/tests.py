from django.test import TestCase
from django.utils import timezone
from eventbrite import Eventbrite
from rest_framework import status
from rest_framework.test import APIClient
from .models import *

import requests
import datetime
import os
import environ


# Test cases for university users
class UserTests(TestCase):
    def setUp(self):
        self.user = UniversityUser.objects.create_user(
            guid='1234567A', password='password'
        )
        self.user.interests = ['maths', 'compilers', 'code']
        self.user.save()

        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_current_user(self):
        """
        Test current user API call returns the logged in user.
        """
        response = self.client.get('/api/current-user.json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['guid'], self.user.guid)

    def test_get_user_interests(self):
        """
        Test getting a user's interests.
        """
        response = self.client.get('/api/user/interests.json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

    def test_amend_user_interests(self):
        """
        Test amending a user's personal interests.
        """
        response = self.client.put(
            '/api/user/interests/amend.json',
            {'interests': '{}'},
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, '{}')

    def test_user_toggle_theme(self):
        """
        Test user switching between light/dark theme.
        """
        response = self.client.put(
            '/api/user/theme.json',
            {'theme': 'dark'},
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)

    def test_user_logout(self):
        """
        Test no user is returned once logged out.
        """
        self.client.logout()

        response = self.client.get('/api/current-user.json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['guid'], 'None')


# Test cases for samoa data feed
class SamoaTests(TestCase):
    def test_connection_to_samoa_api(self):
        """
        Tests whether a connection to samoa is successful.
        """
        response = requests.get(
            'https://samoa.dcs.gla.ac.uk/events/rest/Event/searchtext?search='
        )
        events = response.json()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.headers['Content-Type'], 'application/json')
        self.assertGreater(len(events), 1)

    def test_17012_returns_systems_coffee(self):
        """
        Tests whether the event with id 17012 returns the correct seminar.
        """
        response = requests.get(
            'https://samoa.dcs.gla.ac.uk/events/rest/Event/17012'
        )
        events = response.json()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(events['title'], 'SYSTEMS Coffee')


# Tests cases for connecting to the EventBrite API
class EventBriteTests(TestCase):
    def setUp(self):
        env = environ.Env()
        env_file = os.path.join(os.getcwd(), ".env")
        environ.Env.read_env(env_file)

        self.eventbrite = Eventbrite(env('EVENTBRITE_KEY'))

    def test_connection_to_eventbrite(self):
        """
        Test whether connection to EventBrite is successful.
        """
        self.assertEqual(
            self.eventbrite.headers['content-type'], 'application/json'
        )

    def test_eventbrite_user(self):
        """
        Test the correct user is returned when using the EventBrite api.
        """
        user = self.eventbrite.get_user()

        self.assertEqual(user.headers['Content-Type'], 'application/json')
        self.assertEqual(user['name'], 'Ollie Gardner')

    def test_eventbrite_organiser(self):
        """
        Test getting SoCS EventBrite page from organiser ID.
        """
        organiser = self.eventbrite.get_organizers(6830828415)

        self.assertEqual(organiser.headers['Content-Type'], 'application/json')
        self.assertEqual(
            organiser['name'],
            'School of Computing Science, University of Glasgow'
        )

    def test_eventbrite_organiser_events(self):
        """
        Test getting SoCS EventBrite events from organiser ID.
        """
        organiser_events = self.eventbrite.get_organizer_events(6830828415)

        self.assertEqual(
            organiser_events.headers['Content-Type'], 'application/json'
        )
        self.assertGreater(len(organiser_events), 1)


# Test cases for seminar model
class SeminarTests(TestCase):
    def setUp(self):
        self.user = UniversityUser.objects.create_user(
            guid='1234567A', password='password'
        )

        self.location = Location.objects.create(location='Example Location')

        self.seminar_group = SeminarGroup.objects.create(name='A Seminar Group')

        self.speaker = Speaker.objects.create(
            speaker='Speaker', affiliation='Some Affiliation'
        )

        self.tomorrow = timezone.now() + timezone.timedelta(days=1)
        self.yesterday = timezone.now() - timezone.timedelta(days=1)

        self.seminar_1 = Seminar.objects.create(
            title='Example Seminar',
            description='This is an example seminar about something.',
            start_time=self.tomorrow,
            end_time=self.tomorrow + timezone.timedelta(hours=2),
            online=True,
            location=self.location,
            seminar_group=self.seminar_group,
            speaker=self.speaker,
        )

        self.seminar_2 = Seminar.objects.create(
            title='Another Example Seminar',
            description='This is another seminar.',
            start_time=self.tomorrow,
            end_time=self.tomorrow + timezone.timedelta(hours=4),
            serves_food=True,
        )

        self.seminar_3 = Seminar.objects.create(
            title='Past Seminar',
            description='A seminar in the past.',
            start_time=self.yesterday,
            end_time=self.yesterday + timezone.timedelta(hours=1),
        )

        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_seminar_from_id(self):
        """
        Test getting a seminar from its ID.
        """
        response = self.client.get(
            '/api/seminar.json?id=' + str(self.seminar_1.id)
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.seminar_1.title)

    def test_random_seminar(self):
        """
        Test getting a random seminar.
        """
        response = self.client.get(
            '/api/seminars/random.json?guid=' + self.user.guid
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)

    def test_upcoming_seminars(self):
        """
        Test getting upcoming seminars stored in the database.
        """
        response = self.client.get('/api/seminars/upcoming.json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)

    def test_seminar_attendance(self):
        """
        Test setting a user's attendance for a specific seminar.
        """
        response = self.client.put(
            '/api/seminar/attendance.json?guid=1234567A',
            data={
                'seminar': self.seminar_2.id,
                'discarded': False,
                'rating': 4
            }
        )

        seminar_history = SeminarHistory.objects.get(
            seminar=self.seminar_2, user=self.user
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'success')
        self.assertTrue(seminar_history)

    def test_past_seminars(self):
        """
        Test getting seminars which have happened in the past.
        """
        response = self.client.get('/api/seminars/past.json?guid=1234567A')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(
            response.data['results'][0]['seminar']['title'],
            self.seminar_3.title
        )

    def test_seminar_serves_food_filter(self):
        """
        Test serves food seminar filter.
        """
        response = self.client.get(
            '/api/seminars/upcoming.json?serves_food=True'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(
            response.data['results'][0]['title'], self.seminar_2.title
        )

    def test_seminar_online_filter(self):
        """
        Test online seminar filter.
        """
        response = self.client.get('/api/seminars/upcoming.json?online=True')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(
            response.data['results'][0]['title'], self.seminar_1.title
        )

    def test_seminar_title_ordering(self):
        """
        Test seminar sorting order by title.
        """
        response = self.client.get(
            '/api/seminars/upcoming.json?ordering=-title'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)
        self.assertEqual(
            response.data['results'][0]['title'], self.seminar_1.title
        )
        self.assertEqual(
            response.data['results'][1]['title'], self.seminar_2.title
        )

    def test_seminar_location(self):
        """
        Test whether the seminar's location is set correctly.
        """
        response = self.client.get(
            '/api/seminar.json?id=' + str(self.seminar_1.id)
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['location']['location'], self.location.location
        )

    def test_seminar_group(self):
        """
        Test whether the seminar's group is set correctly.
        """
        response = self.client.get(
            '/api/seminar.json?id=' + str(self.seminar_1.id)
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['seminar_group']['name'], self.seminar_group.name
        )

    def test_seminar_speaker(self):
        """
        Test whether the seminar's speaker is set correctly.
        """
        response = self.client.get(
            '/api/seminar.json?id=' + str(self.seminar_1.id)
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['speaker']['speaker'], self.speaker.speaker
        )

    def test_search_seminar(self):
        """
        Test search seminar functionality.
        """
        response = self.client.get('/api/search.json?q=example')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)
