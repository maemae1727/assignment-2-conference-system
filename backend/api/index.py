import os
from django.core.wsgi import get_wsgi_application
from asgiref.wsgi import WsgiToAsgi

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'conference_system.settings')

_django_app = get_wsgi_application()
app = WsgiToAsgi(_django_app)
