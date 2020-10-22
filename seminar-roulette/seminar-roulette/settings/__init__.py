from .base import *
import environ
import os

env = environ.Env()

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)
env_file = os.path.join(BASE_DIR, ".env")

environ.Env.read_env(env_file)

if env('PRODUCTION') == 'false':
    from .dev import *
else:
    from .prod import *
