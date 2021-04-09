from django.http import Http404
from django_filters.rest_framework import DjangoFilterBackend
from itertools import product
from rest_framework.filters import OrderingFilter
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.models import *
from backend.serializers import *
from recommender import recommendation_engine

import json

import nltk
from nltk.corpus import wordnet

# Download nltk data
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')


def get_user(guid):
    # Get UniversityUser from their guid
    try:
        return UniversityUser.objects.get(guid=guid)
    except UniversityUser.DoesNotExist:
        raise Http404


class RecommenderPagination(PageNumberPagination):
    """
    Pagination options for seminar recommendations.
    """
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


class UserRecommendations(ListAPIView):
    """
    Get seminar recommendations for a user.
    """
    permissions_classes = [IsAuthenticated]

    serializer_class = SeminarSerializer
    pagination_class = RecommenderPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['online', 'serves_food']
    ordering_fields = ['title', 'start_time']

    def get_queryset(self):
        # Get time and guid parameters from url
        time = self.request.query_params.get('time')
        guid = self.request.query_params.get('guid')
        user = get_user(guid)

        user_seminar_history = SeminarHistory.objects.filter(
            user=user, attended=True
        )

        if user_seminar_history:
            recommendation_ids = [
                seminar.id for seminar in recommendation_engine(user)
            ]

            if time:
                time_seminars = get_seminars_by_time(time)
                time_seminar_ids = [seminar.id for seminar in time_seminars]

                intersection_ids = list(
                    set(recommendation_ids) & set(time_seminar_ids)
                )  # takes intersection of both lists

                return Seminar.objects.filter(id__in=intersection_ids
                                             ).order_by('start_time')
            else:
                return Seminar.objects.filter(id__in=recommendation_ids
                                             ).order_by('start_time')
        else:
            return Seminar.objects.none()


class AllUserInterests(APIView):
    """
    Get all user interests from all users to act as suggestions.
    """
    permissions_classes = [IsAuthenticated]

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
    permissions_classes = [IsAuthenticated]

    def put(self, request, format=None):
        new_interests = request.data['interests']

        user = request.user
        user.interests = new_interests
        user.save()

        return Response(user.interests)


class UserSimilarities(APIView):
    """
    Get a user's seminar similarities.
    """
    permissions_classes = [IsAuthenticated]

    def get(self, request, format=None):
        wordnet.ensure_loaded()

        seminars = self.request.query_params.get('seminars')
        guid = self.request.query_params.get('guid')
        user = get_user(guid)

        similarities = {}

        for seminar_id in seminars.split(','):
            try:
                # Load seminar and its keywords
                seminar = Seminar.objects.get(id=seminar_id)
                keywords = json.loads(seminar.keywords)

                # User has not set any interests or seminar has no keywords so set similarity to 0
                if not user.interests or not keywords:
                    similarities[seminar.id] = 0
                    continue

                # Get synsets of words for user interests and keywords
                interest_syns = set(
                    synset for interest in user.interests
                    for synset in wordnet.synsets(interest)
                )

                keyword_syns = set(
                    synset for keyword in keywords[0:3]
                    for synset in wordnet.synsets(keyword['text'])
                )

                # If no synsets of words, set similiarity to 0
                if not interest_syns or not keyword_syns:
                    similarities[seminar.id] = 0
                    continue

                # Calculate best similarity between the sets of words
                best = max(
                    wordnet.wup_similarity(i, j) or 0
                    for i, j in product(interest_syns, keyword_syns)
                )

                # Convert to percentage and round to 1 decimal place
                similarities[seminar.id] = round(best * 100, 1)
            except Seminar.DoesNotExist:
                similarities[seminar.id] = 0
                continue

        return Response(similarities)


class ToggleTheme(APIView):
    """
    Toggle the user's theme between light and dark.
    """
    permissions_classes = [IsAuthenticated]

    def put(self, request, format=None):
        theme = request.data['theme']

        user = request.user
        user.dark_theme_enabled = theme == 'dark'
        user.save()

        return Response(user.dark_theme_enabled)