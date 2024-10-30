import pytest
from django.test import RequestFactory
from django.urls import reverse
from django.utils import timezone
from main.models import Server

from authentication.models import User
from authentication.views import create_account, sign_in


@pytest.fixture
def server():
    server = Server.objects.create(ip='127.0.0.1', production=False, allow_create_accounts=True, allow_sign_in=True)
    return server

@pytest.mark.django_db
def test_create_user(server):
    # Create a new user
    user_data = {
        'Username': 'testuser',
        'Password': 'testpassword',
        'Email': 'testuser@example.com',
        'date_created': timezone.now()
    }
    # Create a mock request object
    factory = RequestFactory()
    request = factory.post(reverse('createaccount'), user_data)
    request.headers=user_data
    request.headers['Internal'] = True
    # Call the create_account view function with the mock request object
    response = create_account(request)
    
    assert response.status_code == 200

@pytest.mark.django_db
def test_create_user_with_no_username( server):
    # Create a new user
    user_data = {
        'Username': 'testuser',
        'Password': '',
        'Email': 'testuser@example.com',
        'date_created': timezone.now()
    }
    # Create a mock request object
    factory = RequestFactory()
    request = factory.post(reverse('createaccount'), user_data)
    request.headers=user_data
    # Call the create_account view function with the mock request object
    response = create_account(request)
    
    # Assert that the response status code is not 200
    assert response.status_code != 200

@pytest.mark.django_db
def test_create_user_with_no_email( server):
    # Create a new user
    user_data = {
        'Username': 'testuser',
        'Password': 'testpassword',
        'Email': '',
        'date_created': timezone.now()
    }
    # Create a mock request object
    factory = RequestFactory()
    request = factory.post(reverse('createaccount'), user_data)
    request.headers=user_data
    # Call the create_account view function with the mock request object
    response = create_account(request)
    
    # Assert that the response status code is not 200
    assert response.status_code != 200

@pytest.mark.django_db
def test_create_user_with_no_password( server):
    # Create a mock request object
    factory = RequestFactory()
    request = factory.post(reverse('createaccount'), {'Username': '', 'Password': 'password', 'Email': 'abc@gmail.com'})
    request.headers={ 'Username': '', 'Password': 'password', 'Email': 'abc@gmail.com' }
    # Call the create_account view function with the mock request object
    response = create_account(request)
    
    # Assert that the response status code is not 200
    assert response.status_code != 200
    
@pytest.mark.django_db
def test_create_user_duplicate_username(server):
    user_data = {
        'Username': 'testuser',
        'Password': 'testpassword',
        'Email': 'testuser@example.com',
        'date_created': timezone.now(),
    }
    # First create a user
    User.objects.create(username=user_data['Username'], email=user_data['Email'], password=user_data['Password'], date_created=user_data['date_created'])

    # Create a mock request object
    factory = RequestFactory()
    request = factory.post(reverse('createaccount'), user_data)
    request.headers=user_data
    
    # Call the create_account view function with the mock request object
    response = create_account(request)
    
    # Assert that the response status code is not 200
    assert response.status_code != 200

@pytest.mark.django_db
def test_signin_user(server):
    # Try to create a user with a duplicate email
    user_data = {
        'Username': 'testuser',
        'Password': 'testpassword',
        'Email': 'testuser@example.com',
        'date_created': timezone.now(),
    }
    # First create a user
    User.objects.create(username=user_data['Username'], email=user_data['Email'], password=user_data['Password'], date_created=user_data['date_created'])

     # Create a mock request object
    factory = RequestFactory()
    request = factory.post(reverse('sign_in'), user_data)
    request.headers=user_data
    
    # Call the create_account view function with the mock request object
    response = sign_in(request)

    assert response.status_code == 200