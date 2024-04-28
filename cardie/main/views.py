from django.shortcuts import HttpResponse, render
from authentication import views
from main.models import Server

def index(request):
    return render(request, "index.html")

def authentication(request):
    server_info = Server.objects.all()[0]

    context = {
        "server_ip": server_info.ip,
        "production": server_info.production
    }

    try:
        request.session["username"]
        request.session["password"]

        return(authentication.views.sign_in)

    except KeyError:
        print("No session data on authentication page!")
        return render(request, "authentication.html", context)

def userinterface(request):
    return render(request, "ui.html")