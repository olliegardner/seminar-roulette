from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    path('current-user/', CurrentUser.as_view()),
    path('user/recommendations/', UserRecommendations.as_view()),
    path('seminar/', SeminarFromID.as_view()),
    path('seminars/', AllSeminars.as_view()),
    path('seminars/random/', RandomSeminar.as_view()),
    path('seminars/history/', UserSeminarHistory.as_view()),
    path('seminars/history/attended/', DidAttendSeminar.as_view()),
    path('seminars/time/', SeminarsByTime.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json'])