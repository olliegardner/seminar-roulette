from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import current_user, UserList

urlpatterns = [
    path('current-user/', current_user),
    path('users/', UserList.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json'])