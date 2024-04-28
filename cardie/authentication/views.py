from django.shortcuts import render, HttpResponse
from django.contrib.auth.hashers import make_password, check_password

from authentication.models import User

from django.utils import timezone

def sign_in(request):
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
                return HttpResponse("success")
            
            else:
                return HttpResponse("error_password_wrong")
            
        elif len(users) == 0:
            return HttpResponse("error_no_accounts")
        
        elif len(users) > 1:
            return HttpResponse("error_multiple_accounts_exist")


def create_account(request):
    if "Username" in request.headers and "Password" in request.headers and "Email" in request.headers:
        username = request.headers["Username"]
        password = request.headers["Email"]
        email = request.headers["Password"]

        users = User.objects.filter(username=username)

        print(len(users))

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