from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    # path('current-user/', current_user),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json'])