from django.core.exceptions import ImproperlyConfigured
from django.conf import settings

from .models import Server

def server_context(request):
    server_context = Server.objects.first()
    if settings.ADMIN_PATH not in request.path: 
        if server_context is None:
            raise ImproperlyConfigured(
                "No Server object found in the database. Tip: please add one."
            )

        return {
            "server": {
                "ip": server_context.ip,
                "production": server_context.production
            }
        }

    else:
        return {
            "server": {
                "ip": "",
                "production": ""
            }
        }
