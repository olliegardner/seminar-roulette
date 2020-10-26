from django.test import TestCase
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient
from .models import *

import requests
import datetime


# test cases for university users
class UserTests(TestCase):
    def setUp(self):
        self.user = UniversityUser.objects.create_user(
            guid='1234567A', password='password'
        )

        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_current_user(self):
        """
        Test current user API call returns the logged in user.
        """
        response = self.client.get('/api/current-user.json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['guid'], self.user.guid)

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

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.headers['Content-Type'], 'application/json')

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


# test cases for seminar model
class SeminarTests(TestCase):
    def setUp(self):
        self.now = timezone.now() + timezone.timedelta(days=1)

        self.seminar = Seminar.objects.create(
            title='Example Seminar',
            description='This is an example seminar about something.',
            start_time=self.now,
            end_time=self.now + timezone.timedelta(hours=2),
        )

    def test_random_seminar(self):
        response = self.client.get('/api/seminars/random.json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.seminar.title)
