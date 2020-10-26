from django.shortcuts import render
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
        now = datetime.datetime.now()
        seminars = Seminar.objects.filter(start_time__gte=now)
        random_seminar = seminars.order_by('?').first()

        serializer = SeminarSerializer(random_seminar)
        return Response(serializer.data)
