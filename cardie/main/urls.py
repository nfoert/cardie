from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("authentication", views.authentication, name="authentication"),
    path("ui", views.userinterface, name="ui"),
    path("home", views.home, name="home"),
    path("editor", views.editor, name="editor")
]