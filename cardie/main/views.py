import os
import json

from django.shortcuts import HttpResponse, render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from authentication.views import sign_in
from main.models import Server, Card
from authentication.models import User

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

def icon_list(request):
    # TODO: This should probably go somewhere else for organization's sake, but I don't know where
    
    icons = []
    with open("./cardie/main/icons_list.txt", "r") as file:
        for line in file.readlines():
            icons.append(line.strip("\n"))

    return JsonResponse(icons, safe=False)

@csrf_exempt
def create_card(request):
    # Creates a new card on the server
    if request.method == "POST":
        # TODO: What if there are two accounts with that username?
        me = User.objects.filter(username=request.session["username"])[0]

        card = Card(uuid=request.headers["UUID"], owner=me)
        card.save()

        return HttpResponse("Done")

    else:
        return HttpResponse("Request is not a POST request")

@csrf_exempt
def check_card(request):
    # Checks if a card exists on the server
    if request.method == "POST":
        card = Card.objects.filter(uuid=request.headers["UUID"]);
        # TODO: What if there are multiple cards with the UUID?
        if card:
            return JsonResponse(json.dumps(card[0].data), safe=False)

        else:
            return HttpResponse("Card does not exist!")

    else:
        return HttpResponse("Request is not a POST request")

@csrf_exempt
def save_card(request):
    # Saves data to a card on the server
    if request.method == "POST":
        card = Card.objects.filter(uuid=request.headers["UUID"])[0]

        # TODO: What if there are multiple cards with the UUID?
        if card:
            card.name = json.loads(request.headers["Data"])["name"]
            card.data = json.loads(request.headers["Data"])
            card.save()
            return HttpResponse("Done")

        else:
            return HttpResponse("Card does not exist!")

    else:
        return HttpResponse("Request is not a POST request")