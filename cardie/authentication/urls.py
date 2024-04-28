from django.urls import path

from . import views

urlpatterns = [
    path("signin", views.sign_in, name="sign_in"),
    path("createaccount", views.create_account, name="createaccount"),
]