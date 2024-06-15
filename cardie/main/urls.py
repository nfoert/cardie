from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("authentication", views.authentication, name="authentication"),
    path("ui", views.userinterface, name="ui"),
    path("home", views.home, name="home"),
    path("editor", views.editor, name="editor"),
    path("iconlist", views.icon_list, name="iconlist"),
    path("createcard", views.create_card, name="createcard"),
    path("checkcard", views.check_card, name="checkcard"),
    path("savecard", views.save_card, name="savecard"),
    path("listcards", views.list_cards, name="listcards"),
    path("card", views.card_view, name="cardview"),
    path("getcard", views.get_card, name="getcard")
]