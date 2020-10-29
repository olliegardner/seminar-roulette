from django.http import Http404
from django.shortcuts import render
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *

import datetime


class CurrentUser(APIView):
    """
    Retrieve the currently logged in user.
    """
    def get(self, request, format=None):
        try:
            serializer = UserSerializer(request.user)
            return Response(serializer.data)
        except:
            return Response({'guid': 'None'})


class RandomSeminar(APIView):
    """
    Chooses a random upcoming seminar from the databse.
    """
    def get(self, request, format=None):
        now = timezone.now()
        seminars = Seminar.objects.filter(start_time__gte=now)
        random_seminar = seminars.order_by('?').first()

        serializer = SeminarSerializer(random_seminar)
        return Response(serializer.data)


class UserSeminarHistory(APIView):
    """
    Create seminar history for a user.
    """
    def get_user(self, guid):
        try:
            return UniversityUser.objects.get(guid=guid)
        except UniversityUser.DoesNotExist:
            raise Http404

    def get_seminar(self, id):
        try:
            return Seminar.objects.get(id=id)
        except Seminar.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        guid = self.request.query_params.get('guid')
        user = self.get_user(guid)

        seminar_history = SeminarHistory.objects.filter(user=user)
        serializer = SeminarHistorySerializer(seminar_history, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        user = self.get_user(request.data['guid'])
        seminar = self.get_seminar(request.data['seminar'])

        seminar_history = SeminarHistory.objects.create(
            seminar=seminar, user=user
        )
        return Response('success')
