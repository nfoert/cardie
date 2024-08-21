from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("authentication", views.authentication, name="authentication"),
    path("ui", views.userinterface, name="ui"),
    path("home", views.home, name="home"),
    path("editor", views.editor, name="editor"),
    path("privacy", views.privacy_policy, name="privacy"),
    path("iconlist", views.icon_list, name="iconlist"),
    path("createcard", views.create_card, name="createcard"),
    path("checkcard", views.check_card, name="checkcard"),
    path("savecard", views.save_card, name="savecard"),
    path("listcards", views.list_cards, name="listcards"),
    path("card", views.card_view, name="cardview"),
    path("getcard", views.get_card, name="getcard"),
    path("logout", views.log_out, name="logout"),
    path("createtempcard", views.create_temp_card, name="createtempcard"),
    path("deletecard", views.delete_card, name="deletecard"),
    path("renamecard", views.rename_card, name="renamecard"),
    path("savetowallet", views.save_to_wallet, name="savetowallet"),
    path("getwallet", views.get_wallet, name="getwallet")
]