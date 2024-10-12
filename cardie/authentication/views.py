from django.shortcuts import HttpResponse
from django.contrib.auth.hashers import make_password, check_password

# from authentication.models import User
from main.models import Server, Card, TempCard
from main import views

from django.utils import timezone
import uuid


from .forms import UserUpdateForm, ProfileUpdateForm
from django.shortcuts import render, get_object_or_404, redirect
from .models import Profile
from django.contrib import messages
from .models import User

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

                    try:
                        temp_uuid = request.headers["TempUUID"]
                        temp_card = TempCard.objects.filter(uuid=temp_uuid)[0]
                        
                        card = Card(uuid=uuid.uuid4(), owner=users[0], name=temp_card.data["name"], data=temp_card.data)
                        card.save()

                        temp_card.delete()

                        return HttpResponse(f"card_added_to_account {card.uuid}")

                    except KeyError:
                        pass

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

            if username == "":
                return HttpResponse("no_username")

            if password == "":
                return HttpResponse("no_password")

            if email == "":
                return HttpResponse("no_email")


            users = User.objects.filter(username=username)

            if len(users) > 0:
                return HttpResponse("error_account_already_exists")
            
            else:
                hashed_password = make_password(password)

                user = User(username=username, password=hashed_password, email=email, date_created=timezone.now())
                user.save()

                Profile.objects.create(user=user)

                request.session["username"] = username
                request.session["password"] = password

                return sign_in(request)

        else:
            return HttpResponse("error_missing_headers")
    else:
        return HttpResponse("error_create_account_disabled")


def profile(request):
    username = request.session.get("username")
    user = get_object_or_404(User, username=username)
    profile, created = Profile.objects.get_or_create(user=user)


    is_editing = request.GET.get('edit') == 'true'

    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=user)
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance=profile)

        if u_form.is_valid() and p_form.is_valid():
            new_username = u_form.cleaned_data.get('username')
            user = u_form.save()
            p_form.save()

            # Update the session if username has changed
            if new_username and new_username != username:
                request.session['username'] = new_username

            messages.success(request, 'Your profile has been updated!')
            return redirect('profile')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        u_form = UserUpdateForm(instance=user)
        p_form = ProfileUpdateForm(instance=profile)

    context = {
        'profile': profile,
        'u_form': u_form,
        'p_form': p_form,
        'is_editing': is_editing,
    }

    return render(request, 'profile_var.html', context)
