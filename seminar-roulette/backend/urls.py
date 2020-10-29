from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    path('current-user/', CurrentUser.as_view()),
    path('seminars/random/', RandomSeminar.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json'])