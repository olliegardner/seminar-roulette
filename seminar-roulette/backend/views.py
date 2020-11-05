from django.http import Http404
from django.shortcuts import render
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *

import datetime
import calendar


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
        time = self.request.query_params.get('time')
        now = timezone.now()

        if time == "hour":
            then = now + timezone.timedelta(hours=1)

            seminars = Seminar.objects.filter(
                start_time__gte=now, end_time__lte=then
            )
        elif time == "today":
            seminars = Seminar.objects.filter(
                start_time__gte=now, start_time__date=now.date()
            )
        elif time == "tomorrow":
            tomorrow = now + timezone.timedelta(days=1)

            seminars = Seminar.objects.filter(start_time__date=tomorrow)
        elif time == "week":
            end_of_week = now + timezone.timedelta(days=6 - now.weekday())

            seminars = Seminar.objects.filter(
                start_time__gte=now,
                start_time__date__range=(now.date(), end_of_week)
            )
        elif time == "month":
            end_of_month = datetime.date(
                now.year, now.month,
                calendar.monthrange(now.year, now.month)[-1]
            )

            seminars = Seminar.objects.filter(
                start_time__gte=now,
                start_time__date__range=(now.date(), end_of_month)
            )

        random_seminar = seminars.order_by('?').first()

        if random_seminar:
            serializer = SeminarSerializer(random_seminar)
            return Response(serializer.data)
        else:
            return Response('No seminar found')


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

        seminar_history = SeminarHistory.objects.filter(
            user=user, attended=False, discarded=False
        )
        serializer = SeminarHistorySerializer(seminar_history, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        user = self.get_user(request.data['guid'])
        seminar = self.get_seminar(request.data['seminar'])

        seminar_history = SeminarHistory.objects.create(
            seminar=seminar, user=user
        )
        return Response('success')


class DidAttendSeminar(APIView):
    """
    Set a seminar to attended.
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

    def put(self, request, format=None):
        guid = self.request.query_params.get('guid')
        user = self.get_user(guid)
        seminar = self.get_seminar(request.data['seminar'])
        discarded = request.data['discarded']

        seminar_history = SeminarHistory.objects.get(seminar=seminar, user=user)
        seminar_history.attended = not discarded
        if seminar_history.attended:
            seminar_history.rating = request.data['rating']
        seminar_history.discarded = discarded
        seminar_history.save()

        return Response('success')
