from django.shortcuts import HttpResponse, render

def index(request):
    return render(request, "index.html")

def userinterface(request):
    return render(request, "ui.html")