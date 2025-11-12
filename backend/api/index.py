# Serverless entrypoint for Vercel Python runtime (ASGI)
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'conference_system.settings')

from django.core.wsgi import get_wsgi_application
from asgiref.wsgi import WsgiToAsgi

_django = get_wsgi_application()
# Vercel looks for an ASGI callable named `app`
app = WsgiToAsgi(get_wsgi_application())
