from django.shortcuts import HttpResponse, render
from authentication.views import sign_in
from main.models import Server

def index(request):
    server_info = Server.objects.all()[0]

    context = {
        "server_ip": server_info.ip,
        "production": server_info.production
    }

    return render(request, "index.html", context)

def authentication(request):
    server_info = Server.objects.all()[0]

    context = {
        "server_ip": server_info.ip,
        "production": server_info.production
    }

    try:
        request.session["username"]
        request.session["password"]

        return(sign_in(request))

    except KeyError:
        print("No session data on authentication page!")
        return render(request, "authentication.html", context)

def userinterface(request):
    return render(request, "ui.html")

def home(request):
    server_info = Server.objects.all()[0]

    try:
        request.session["username"]
        request.session["password"]

        context = {
            "server_ip": server_info.ip,
            "production": server_info.production,
            "username": request.session["username"]
        }

        return render(request, "home.html", context)

    except KeyError:
        print("No session data on home page!")
        return authentication(request)
    
def editor(request):
    server_info = Server.objects.all()[0]

    try:
        request.session["username"]
        request.session["password"]

        context = {
            "server_ip": server_info.ip,
            "production": server_info.production,
            "username": request.session["username"]
        }

        return render(request, "editor.html", context)

    except KeyError:
        print("No session data on home page!")
        return authentication(request)