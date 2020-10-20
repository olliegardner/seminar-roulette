from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *


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
