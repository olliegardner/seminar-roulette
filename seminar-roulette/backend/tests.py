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


# test cases for university users
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
            data={'interests': '{}'},
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, '{}')

    def test_user_logout(self):
        """
        Test no user is returned once logged out.
        """
        self.client.logout()

        response = self.client.get('/api/current-user.json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['guid'], 'None')


# test cases for samoa feed
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


# tests cases for connecting to the EventBrite API
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


# test cases for seminar model
class SeminarTests(TestCase):
    def setUp(self):
        self.user = UniversityUser.objects.create_user(
            guid='1234567A', password='password'
        )

        self.tomorrow = timezone.now() + timezone.timedelta(days=1)

        self.seminar = Seminar.objects.create(
            title='Example Seminar',
            description='This is an example seminar about something.',
            start_time=self.tomorrow,
            end_time=self.tomorrow + timezone.timedelta(hours=2),
        )

        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_random_seminar(self):
        response = self.client.get(
            '/api/seminars/random.json?guid=' + self.user.guid
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['results'][0]['title'], self.seminar.title
        )
