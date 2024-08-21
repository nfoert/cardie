import os
import json

from django.shortcuts import HttpResponse, render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from authentication.views import sign_in
from main.models import Server, Card, TempCard
from authentication.models import User
from django.utils import timezone

def index(request):
    server_info = Server.objects.all()[0]

    try:
        username = request.session["username"]

        context = {
            "server_ip": server_info.ip,
            "production": server_info.production,
            "username": username
        }    

        return render(request, "index.html", context)

    except KeyError:
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

    if bool(request.GET.get("demo", False)):
        # Open the editor without authenticating
        context = {
            "server_ip": server_info.ip,
            "production": server_info.production,
        }

        return render(request, "editor.html", context)

    else:
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
            print("No session data on editor page!")
            return authentication(request)

def privacy_policy(request):
    server_info = Server.objects.all()[0]

    context = {
        "server_ip": server_info.ip,
        "production": server_info.production
    }

    return render(request, "privacy.html", context)

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

        card = Card(uuid=request.headers["UUID"], owner=me,card_last_edited_on = timezone.now(),card_created_on = timezone.now())
        card.save()

        return HttpResponse("Done")

    else:
        return HttpResponse("Request is not a POST request")

@csrf_exempt
def check_card(request):
    # Checks if a card exists on the server
    if request.method == "POST":
        card = Card.objects.filter(uuid=request.headers["UUID"])
        me = User.objects.filter(username=request.session["username"])[0]
        # TODO: What if there are multiple cards with the UUID?
        if card:
            # Card exists on the server
            if card[0].owner == me:
                # You own this card
                return JsonResponse(card[0].data, safe=False)

            else:
                # You don't have permission to access this card
                return HttpResponse("No Permission")

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
            card.card_last_edited_on = timezone.now()
            card.save()
            return HttpResponse("Done")

        else:
            return HttpResponse("Card does not exist!")

    else:
        return HttpResponse("Request is not a POST request")

@csrf_exempt
def list_cards(request):
    # Lists all of the cards that the user owns
    if request.method == "POST":
        # TODO: What if there are two accounts with that username?
        me = User.objects.filter(username=request.session["username"])[0]
        cards = Card.objects.filter(owner=me)
        cards_list = []

        for card in range(len(cards)):
            card_json = {
                "uuid": cards[card].uuid,
                "name": cards[card].name
            }

            cards_list.append(card_json)
        
        return JsonResponse(cards_list, safe=False)

    else:
        return HttpResponse("Request is not a POST request")

def card_view(request):
    server_info = Server.objects.all()[0]

    try:
        username = request.session["username"]

        context = {
            "server_ip": server_info.ip,
            "production": server_info.production,
            "username": username
        }

        return render(request, "card_view.html", context)

    except KeyError:
        context = {
            "server_ip": server_info.ip,
            "production": server_info.production
        }

        return render(request, "card_view.html", context)

@csrf_exempt
def get_card(request):
    # Gets the json of a card by UUID
    if request.method == "POST":
        # TODO: What if there are multiple cards with that UUID?
        card = Card.objects.filter(uuid=request.headers["UUID"])[0]
        
        return JsonResponse(card.data, safe=False);

    else:
        return HttpResponse("Request is not a POST request")

@csrf_exempt
def log_out(request):
    # TODO: This should probably go somewhere else for organization's sake, but I don't know where

    if request.method == "POST":
        del request.session["username"]
        del request.session["password"]

        return HttpResponse("Success")

    else:
        return HttpResponse("Request is not a POST request")

@csrf_exempt
def create_temp_card(request):
    if request.method == "POST":
        if request.headers["data"]:
            temp_card = TempCard(data=json.loads(request.headers["data"]), created=timezone.now())
            temp_card.save()
            
            return HttpResponse(temp_card.uuid)
            
        else:
            return HttpResponse("Missing headers")
        
    else:
        return HttpResponse("Request is not a POST request")

@csrf_exempt
def delete_card(request):
    if request.method == "POST":
        if request.headers["uuid"]:
            # TODO: What if there are two accounts with that username?
            me = User.objects.filter(username=request.session["username"])[0]

            card = Card.objects.filter(uuid=request.headers["uuid"], owner=me)[0]
            
            if card:
                card.delete()
                return HttpResponse("Success")

            else:
                return HttpResponse("Card not found")
            
        else:
            return HttpResponse("Missing headers")
        
    else:
        return HttpResponse("Request is not a POST request")

@csrf_exempt
def rename_card(request):
    if request.method == "POST":
        if request.headers["uuid"] and request.headers["name"]:
            # TODO: What if there are two accounts with that username?
            me = User.objects.filter(username=request.session["username"])[0]

            card = Card.objects.filter(uuid=request.headers["uuid"], owner=me)[0]
            
            if card:
                card.name = request.headers["name"]
                card.data["name"] = request.headers["name"]
                card.save()
                return HttpResponse("Success")

            else:
                return HttpResponse("Card not found")
            
        else:
            return HttpResponse("Missing headers")
        
    else:
        return HttpResponse("Request is not a POST request")

@csrf_exempt
def save_to_wallet(request):
    if request.method == "POST":
        if request.headers["uuid"]:
            try:
                me = User.objects.filter(username=request.session["username"])[0]

                card = Card.objects.filter(uuid=request.headers["uuid"])[0]
                
                if card:
                    me.wallet.add(card)
                    me.save()
                    return HttpResponse("Success")

                else:
                    return HttpResponse("Card not found")
                    
            except KeyError:
                return HttpResponse("Not signed in")
            
        else:
            return HttpResponse("Missing headers")
        
    else:
        return HttpResponse("Request is not a POST request")

@csrf_exempt
def get_wallet(request):
    if request.method == "POST":
        try:
            me = User.objects.filter(username=request.session["username"])[0]

            wallet = []
            for card in range(len(me.wallet.all())):
                wallet_item = {
                    "name": me.wallet.all()[card].name,
                    "uuid": me.wallet.all()[card].uuid
                }

                wallet.append(wallet_item)

                return JsonResponse(wallet, safe=False)
                
        except KeyError:
            return HttpResponse("Not signed in")
        
    else:
        return HttpResponse("Request is not a POST request")