from django.db.models import Q
from django.http import Http404
from django.shortcuts import render
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *
from recommender import recommendation_engine

import datetime
import calendar


class Helpers():
    def get_user(self, guid):
        try:
            return UniversityUser.objects.get(guid=guid)
        except UniversityUser.DoesNotExist:
            raise Http404

    def get_seminar(self, seminar_id):
        try:
            return Seminar.objects.get(id=seminar_id)
        except Seminar.DoesNotExist:
            raise Http404


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
    Chooses a random upcoming seminar.
    """
    def get(self, request, format=None):
        helpers = Helpers()

        time = self.request.query_params.get('time')
        guid = self.request.query_params.get('guid')
        food = self.request.query_params.get('food')

        user = helpers.get_user(guid)
        now = timezone.now()

        if time == "hour":
            then = now + timezone.timedelta(hours=1)

            seminars = Seminar.objects.filter(
                start_time__gte=now, start_time__lte=then
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

        # get seminars which user has attended OR discarded
        seminar_history = user.seminarhistory_set.filter(
            Q(attended=True) | Q(discarded=True)
        )
        seminars_attended_discarded = Seminar.objects.filter(
            id__in=seminar_history
        )

        # get seminars in a time frame which a user hasn't been to or been recommended
        available_seminars = seminars.exclude(
            id__in=seminars_attended_discarded
        )

        if food == 'true':
            food_seminars = []
            food_words = [
                'refreshment', 'breakfast', 'lunch', 'dinner', 'snack'
            ]

            # get seminars which serve food
            for food_word in food_words:
                seminars = available_seminars.filter(
                    description__icontains=food_word
                )
                for seminar in seminars:
                    if seminar not in food_seminars:
                        food_seminars.append(seminar.id)

            random_seminar = Seminar.objects.filter(id__in=food_seminars
                                                   ).order_by('?').first()
        else:
            random_seminar = available_seminars.order_by('?').first()

        if random_seminar:
            serializer = SeminarSerializer(random_seminar)
            return Response(serializer.data)
        else:
            return Response('No seminar found')


class UserSeminarHistory(APIView):
    """
    Create seminar history for a user.
    """
    def get(self, request, format=None):
        helpers = Helpers()

        guid = self.request.query_params.get('guid')
        user = helpers.get_user(guid)

        now = timezone.now()

        past_seminars = Seminar.objects.filter(
            start_time__lte=now, end_time__lte=now
        )

        for seminar in past_seminars:
            seminar_history, seminar_history_created = SeminarHistory.objects.get_or_create(
                user=user, seminar=seminar
            )

        seminar_history = SeminarHistory.objects.filter(
            user=user, attended=False, discarded=False
        )
        serializer = SeminarHistorySerializer(seminar_history, many=True)
        return Response(serializer.data)

    # def post(self, request, format=None):
    #     helpers = Helpers()
    #     user = helpers.get_user(request.data['guid'])
    #     seminar = helpers.get_seminar(request.data['seminar'])

    #     seminar_history = SeminarHistory.objects.create(
    #         seminar=seminar, user=user
    #     )
    #     return Response('success')


class DidAttendSeminar(APIView):
    """
    Set a seminar to attended.
    """
    def put(self, request, format=None):
        helpers = Helpers()

        guid = self.request.query_params.get('guid')
        user = helpers.get_user(guid)
        seminar = helpers.get_seminar(request.data['seminar'])
        discarded = request.data['discarded']

        seminar_history = SeminarHistory.objects.get(seminar=seminar, user=user)
        seminar_history.attended = not discarded
        if seminar_history.attended:
            seminar_history.rating = request.data['rating']
        seminar_history.discarded = discarded
        seminar_history.save()

        return Response('success')


class UserRecommendations(APIView):
    """
    Get seminar recommendations for a user.
    """
    def get(self, request, format=None):
        helpers = Helpers()

        guid = self.request.query_params.get('guid')
        user = helpers.get_user(guid)

        recommendations = recommendation_engine(user)

        serializer = SeminarSerializer(recommendations, many=True)
        return Response(serializer.data)


class SeminarFromID(APIView):
    """
    Get seminar from seminar ID.
    """
    def get(self, request, format=None):
        helpers = Helpers()

        seminar_id = self.request.query_params.get('id')
        seminar = helpers.get_seminar(seminar_id)

        serializer = SeminarSerializer(seminar)
        return Response(serializer.data)
