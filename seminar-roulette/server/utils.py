from seminars.serializers import UniversityUserSerializer


def jwt_handler(token, user=None, request=None):
    return {
        'token':
            token,
        'user':
            UniversityUserSerializer(user, context={
                'request': request
            }).data
    }