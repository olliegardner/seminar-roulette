DEBUG = False
ALLOWED_HOSTS = ['howard.dcs.gla.ac.uk']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'backend',
    'frontend',
    'shibboleth',
    'watson',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'shibboleth.middleware.ShibbolethRemoteUserMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'watson.middleware.SearchContextMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS':
            {
                'context_processors':
                    [
                        'django.template.context_processors.debug',
                        'django.template.context_processors.request',
                        'django.contrib.auth.context_processors.auth',
                        'django.contrib.messages.context_processors.messages',
                    ],
            },
    },
]

SECURE_SSL_REDIRECT = True

# Rest Framework
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': ('rest_framework.renderers.JSONRenderer', )
}

# Shibboleth
AUTHENTICATION_BACKENDS = ('shibboleth.backends.ShibbolethRemoteUserBackend', )

SHIBBOLETH_ATTRIBUTE_MAP = {
    'HTTP_DH75HDYT76': (True, 'guid'),
    'HTTP_DH75HDYT77': (True, 'name')
}

SHIBBOLETH_GROUP_ATTRIBUTES = ['HTTP_DH75HDYT78']

LOGIN_URL = 'https://howard.dcs.gla.ac.uk/Shibboleth.sso/Login'
LOGOUT_URL = 'https://howard.dcs.gla.ac.uk/Shibboleth.sso/Logout'
