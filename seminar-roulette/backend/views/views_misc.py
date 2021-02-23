from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from watson import search as watson

from backend.models import *
from backend.serializers import *


class SearchPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class Search(ListAPIView):
    """
    Retrieve search results from models.
    """
    serializer_class = SeminarSerializer
    pagination_class = SearchPagination
    filter_backends = [OrderingFilter]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['online', 'serves_food']
    ordering_fields = ['title', 'start_time']

    def handle_search(self, query, model):
        search_results = watson.search(query, models=(model, ))
        search_results = map(lambda x: x.object, search_results)

        # remove invalid results
        search_results = filter(lambda x: x is not None, search_results)
        search_results = [x for x in search_results if x != None]

        search_results_ids = [seminar.id for seminar in search_results]

        return search_results_ids

    def get_queryset(self):
        query = self.request.query_params.get('q')

        if query:  # if a search has taken place
            seminar_ids = self.handle_search(query, Seminar)
            return Seminar.objects.filter(id__in=seminar_ids)

        return []