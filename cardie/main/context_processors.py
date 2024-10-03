from django.core.exceptions import ImproperlyConfigured

from .models import Server

def server_context(request):
    server_context = Server.objects.first()
    if server_context is None:
        raise ImproperlyConfigured(
            "No Server object found in the database. Tip: please add one."
        )

    return {
        "server": {
            "ip": server_context.ip,
            "production": server_context.production,
        }
    }
