from django.db.models import Q
from django.http import Http404
from django.shortcuts import render
from django.utils import timezone
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from watson import search as watson

from .models import *
from .serializers import *
from recommender import recommendation_engine
from itertools import product

import datetime
import calendar
import json
import re

import nltk
from nltk.corpus import wordnet

nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')


def get_user(guid):
    try:
        return UniversityUser.objects.get(guid=guid)
    except UniversityUser.DoesNotExist:
        raise Http404


def get_seminar(seminar_id):
    try:
        return Seminar.objects.get(id=seminar_id)
    except Seminar.DoesNotExist:
        raise Http404


class SeminarPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class RecommenderPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 5


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
        time = self.request.query_params.get('time')
        guid = self.request.query_params.get('guid')
        food = self.request.query_params.get('food')

        user = get_user(guid)
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

        # if food == 'true':
        #     food_seminars = []
        #     food_words = [
        #         'refreshment', 'breakfast', 'lunch', 'dinner', 'snack'
        #     ]

        #     # get seminars which serve food
        #     for food_word in food_words:
        #         seminars = available_seminars.filter(
        #             description__icontains=food_word
        #         )
        #         for seminar in seminars:
        #             if seminar not in food_seminars:
        #                 food_seminars.append(seminar.id)

        #     random_seminar = Seminar.objects.filter(id__in=food_seminars
        #                                            ).order_by('?').first()
        # else:
        #     random_seminar = available_seminars.order_by('?').first()

        # random_seminar = available_seminars.filter(
        #     serves_food=(food == 'true')
        # ).order_by('?').first()

        food_seminars = [
            seminar.id for seminar in available_seminars if seminar.serves_food
        ]

        if food == 'true':
            random_seminar = available_seminars.filter(id__in=food_seminars
                                                      ).order_by('?').first()
        else:
            random_seminar = available_seminars.order_by('?').first()

        if random_seminar:
            serializer = SeminarSerializer(random_seminar)
            return Response(serializer.data)
        else:
            return Response('No seminar found')


class SeminarAttendance(APIView):
    """
    Set a whether a user attended a seminar or not.
    """
    def put(self, request, format=None):
        guid = self.request.query_params.get('guid')
        user = get_user(guid)
        seminar = get_seminar(request.data['seminar'])
        discarded = request.data['discarded']

        seminar_history, seminar_history_created = SeminarHistory.objects.get_or_create(
            seminar=seminar, user=user
        )
        seminar_history.attended = not discarded

        if seminar_history.attended:
            seminar_history.rating = request.data['rating']

        seminar_history.discarded = discarded
        seminar_history.save()

        return Response('success')


class UserRecommendations(ListAPIView):
    """
    Get seminar recommendations for a user.
    """

    serializer_class = SeminarSerializer
    pagination_class = RecommenderPagination

    def get_queryset(self):
        guid = self.request.query_params.get('guid')
        user = get_user(guid)

        user_seminar_history = SeminarHistory.objects.filter(
            user=user, attended=True
        )

        if user_seminar_history:
            return recommendation_engine(user)
        else:
            return []


class AllUserInterests(APIView):
    """
    Get all user interests from all users to act as suggestions.
    """
    def get(self, request, format=None):
        users = UniversityUser.objects.all()
        interests = []

        for user in users:
            for interest in user.interests:
                if not interest in interests:
                    interests.append(interest)

        return Response(interests)


class AmendUserInterests(APIView):
    """
    Amends a user's interests.
    """
    def put(self, request, format=None):
        new_interests = request.data['interests']

        user = request.user
        user.interests = new_interests
        user.save()

        return Response(user.interests)


class SeminarFromID(APIView):
    """
    Get seminar from seminar ID.
    """
    def get(self, request, format=None):
        seminar_id = self.request.query_params.get('id')
        seminar = get_seminar(seminar_id)

        serializer = SeminarSerializer(seminar)
        return Response(serializer.data)


class SeminarSimilarities(ListAPIView):
    """
    Get seminars which are similar to a user's interests.
    """
    def get(self, request, format=None):
        paginator = PageNumberPagination()
        paginator.page_size = 3

        guid = self.request.query_params.get('guid')
        user = get_user(guid)

        similarities = []
        now = timezone.now()

        seminars = Seminar.objects.filter(
            start_time__gte=now, end_time__gte=now
        ).order_by('start_time')

        for seminar in seminars:
            # keywords = get_seminar_keywords(seminar)
            keywords = json.loads(seminar.keywords)
            percentages = []

            if not user.interests:
                page_results = paginator.paginate_queryset([], request)
                return paginator.get_paginated_response([])

            for interest in user.interests:
                syn_interest = wordnet.synsets(interest)
                scores = []

                for keyword in keywords[0:3]:
                    syn_keyword = wordnet.synsets(keyword['text'])
                    max_score = 0

                    for i, j in list(product(*[syn_interest, syn_keyword])):
                        score = i.wup_similarity(j)

                        if score:
                            max_score = score if max_score < score else max_score

                    scores.append(max_score)

                percentages.append(round((sum(scores) / len(scores)) * 100, 1))

            similarities.append(
                {
                    'seminar': SeminarSerializer(seminar).data,
                    'similarity': round(sum(percentages) / len(percentages), 1)
                }
            )

        sorted_similarities = sorted(
            similarities, key=lambda x: x['similarity'], reverse=True
        )

        page_results = paginator.paginate_queryset(
            sorted_similarities[0:3], request
        )
        return paginator.get_paginated_response(page_results)


class AllSeminars(ListAPIView):
    """
    Get all the upcoming seminars in the database.
    """

    serializer_class = SeminarSerializer
    pagination_class = SeminarPagination

    def get_queryset(self):
        now = timezone.now()

        seminars = Seminar.objects.filter(
            start_time__gte=now, end_time__gte=now
        ).order_by('start_time')

        return seminars


class SeminarsByTime(ListAPIView):
    """
    Find seminars within a timeframe.
    """

    serializer_class = SeminarSerializer
    pagination_class = SeminarPagination

    def get_queryset(self):
        time = self.request.query_params.get('time')

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

        seminars = seminars.order_by('start_time')

        return seminars


class PastSeminars(APIView):
    """
    Get seminars which are now in the past.
    """
    def get(self, request, format=None):
        guid = self.request.query_params.get('guid')
        rated = self.request.query_params.get('rated')
        discarded = self.request.query_params.get('discarded')

        user = get_user(guid)
        show_rated = rated == 'true'
        show_discarded = discarded == 'true'

        now = timezone.now()

        past_seminars = Seminar.objects.filter(
            start_time__lt=now, end_time__lt=now
        ).order_by('-start_time')

        attended_seminars = SeminarHistory.objects.filter(
            user=user, attended=True
        ).values_list('seminar', flat=True)

        discarded_seminars = SeminarHistory.objects.filter(
            user=user, discarded=True
        ).values_list('seminar', flat=True)

        exclude_seminars = Seminar.objects.none()

        if not show_rated and not show_discarded:
            exclude_seminars = attended_seminars.union(discarded_seminars)
        elif not show_rated and show_discarded:
            exclude_seminars = attended_seminars
        elif show_rated and not show_discarded:
            exclude_seminars = discarded_seminars

        past_seminars = past_seminars.exclude(id__in=exclude_seminars)

        data = []

        for seminar in past_seminars:
            try:
                seminar_history = SeminarHistory.objects.get(
                    user=user, seminar=seminar
                )
                rating = seminar_history.rating
                discarded = seminar_history.discarded
            except SeminarHistory.DoesNotExist:
                rating = None
                discarded = None

            data.append(
                {
                    'seminar': SeminarSerializer(seminar).data,
                    'rating': rating,
                    'discarded': discarded
                }
            )

        paginator = PageNumberPagination()
        paginator.page_size = 10
        page_results = paginator.paginate_queryset(data, request)
        response = paginator.get_paginated_response(page_results)

        return response


class Search(ListAPIView):
    """
    Retrieve search results from models.
    """

    serializer_class = SeminarSerializer
    pagination_class = SeminarPagination

    def handle_search(self, query, model):
        search_results = watson.search(query, models=(model, ))
        search_results = map(lambda x: x.object, search_results)

        # remove invalid results
        search_results = filter(lambda x: x is not None, search_results)
        search_results = [x for x in search_results if x != None]

        search_results = sorted(search_results, key=lambda x: x.start_time)

        return search_results

    def get_queryset(self):
        query = self.request.GET.get('q')

        if query:  # if a search has taken place
            return self.handle_search(query, Seminar)

        return []
