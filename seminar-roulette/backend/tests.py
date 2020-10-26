from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from .models import *


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
# class SamoaTests(TestCase):
#     def setUp(self):
#         pass

#     def test_example(self):
#         """
#         Example test.
#         """
#         test_sum = 1 + 1
#         self.assertEqual(test_sum, 2)
