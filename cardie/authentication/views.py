from django.shortcuts import render, HttpResponse
from django.contrib.auth.hashers import make_password, check_password

from authentication.models import User
from main.models import Server
from main import views

from django.utils import timezone

def sign_in(request):
    server = Server.objects.all()[0] # TODO: What if there is multiple server objects?

    if server.allow_sign_in:
        if "Username" in request.headers and "Password" in request.headers:
            username = request.headers["Username"]
            password = request.headers["Password"]

            signed_in = True

        else:
            try:
                username = request.session["username"]
                password = request.session["password"]

                signed_in = True

            except KeyError:
                print("Missing headers and no session!")
                return HttpResponse("error_missing_headers_and_session")
            

        if signed_in:
            users = User.objects.filter(username=username)

            if len(users) == 1:
                password_check = check_password(password, users[0].password)

                if password_check:
                    request.session["username"] = username
                    request.session["password"] = password

                    if request.headers["Internal"] == "true":
                        return HttpResponse("success")

                    else:
                        return views.home(request)

                else:
                    return HttpResponse("error_password_wrong")
                
            elif len(users) == 0:
                return HttpResponse("error_no_accounts")
            
            elif len(users) > 1:
                return HttpResponse("error_multiple_accounts_exist")
    else:
        return HttpResponse("error_sign_in_disabled")


def create_account(request):
    server = Server.objects.all()[0] # TODO: What if there is multiple server objects?

    if server.allow_create_accounts:
        if "Username" in request.headers and "Password" in request.headers and "Email" in request.headers:
            username = request.headers["Username"]
            password = request.headers["Password"]
            email = request.headers["Email"]

            users = User.objects.filter(username=username)

            if len(users) > 0:
                return HttpResponse("error_account_already_exists")
            
            else:
                hashed_password = make_password(password)

                user = User(username=username, password=hashed_password, email=email, date_created=timezone.now())
                user.save()

                request.session["username"] = username
                request.session["password"] = password

                return sign_in(request)

        else:
            return HttpResponse("error_missing_headers")
    else:
        return HttpResponse("error_create_account_disabled")