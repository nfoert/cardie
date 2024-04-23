from django.shortcuts import HttpResponse, render

def index(request):
    return render(request, "index.html")

def authentication(request):
    return render(request, "authentication.html")

def userinterface(request):
    return render(request, "ui.html")