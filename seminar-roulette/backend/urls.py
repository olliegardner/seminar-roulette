from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    # user api calls
    path('current-user/', CurrentUser.as_view()),
    path('user/recommendations/', UserRecommendations.as_view()),
    path('user/interests/', AllUserInterests.as_view()),
    path('user/interests/amend/', AmendUserInterests.as_view()),

    # seminar api calls
    path('seminar/', SeminarFromID.as_view()),
    path('seminar/attendance/', SeminarAttendance.as_view()),
    path('seminar/keywords/', SeminarKeywords.as_view()),
    path('seminar/similarities/', SeminarSimilarities.as_view()),
    path('seminars/', AllSeminars.as_view()),
    path('seminars/random/', RandomSeminar.as_view()),
    # path('seminars/history/', UserSeminarHistory.as_view()),
    path('seminars/time/', SeminarsByTime.as_view()),
    path('seminars/past/', PastSeminars.as_view()),

    # misc api calls
    path('search/', Search.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json'])