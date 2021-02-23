from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from backend.views.views_user import *
from backend.views.views_seminar import *
from backend.views.views_misc import *

urlpatterns = [
    # User API calls
    path('current-user/', CurrentUser.as_view()),
    path('user/recommendations/', UserRecommendations.as_view()),
    path('user/interests/', AllUserInterests.as_view()),
    path('user/interests/amend/', AmendUserInterests.as_view()),
    path('user/similarities/', UserSimilarities.as_view()),
    path('user/theme/', ToggleTheme.as_view()),

    # Seminar API calls
    path('seminar/', SeminarFromID.as_view()),
    path('seminar/attendance/', SeminarAttendance.as_view()),
    path('seminars/upcoming/', UpcomingSeminars.as_view()),
    path('seminars/random/', RandomSeminar.as_view()),
    path('seminars/past/', PastSeminars.as_view()),

    # Misc API calls
    path('search/', Search.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json'])