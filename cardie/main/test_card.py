import uuid

import pytest
from authentication.models import User
from authentication.views import sign_in
from django.test import RequestFactory
from django.urls import reverse
from django.utils import timezone

from main.models import Server
from main.views import check_card, create_card, delete_card

CARD_VIEWS = {
    'CHECK_CARD' : 'checkcard',
    'CREATE_CARD' : 'createcard',
    'DELETE_CARD' : 'deletecard',
    'SIGN_IN' : 'signin',
    'RENAME_CARD' : 'renamecard'
}

# NOTE:Tests can only access the data in current session. 
# In accordance with DRY principle create a fixture to avoid repetition in tests
@pytest.fixture
def server():
    print("Running server fixture")
    server = Server.objects.create(ip='127.0.0.1', production=False, allow_create_accounts=True, allow_sign_in=True)
    return server

@pytest.fixture
def user(server):
    print("server in user fixture",server)
    ## Try to create a user with a duplicate email
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
    request = factory.post(reverse(CARD_VIEWS['SIGN_IN']), user_data)
    request.headers=user_data
    request.headers['Internal'] = True
    
    # Call the create_account view function with the mock request object
    response = sign_in(request)
    return (user_data, response) # Return the user data and response

@pytest.fixture
def card(user):
    user_data = user[0]
    uuid_data = {'UUID' : uuid.uuid4()}
    # Create card for signed in user
    factory = RequestFactory()
    request = factory.post(reverse(CARD_VIEWS['CREATE_CARD']), uuid_data)
    request.session = {'username' : user_data['Username'],'password' : user_data['Password']}
    request.headers = uuid_data
    
    response = create_card(request)
    return (user_data, uuid_data, response) # Return the user data, uuid and response

@pytest.mark.django_db
def test_create_card(server,user):
    user_data = user[0]
    # Create card for signed in user
    factory = RequestFactory()
    request = factory.post(reverse(CARD_VIEWS['CREATE_CARD']), {'UUID': 'testuuid'})
    request.session = {'username' : user_data['Username'],'password' : user_data['Password']}
    request.headers = {'UUID' : uuid.uuid4()}
    
    response = create_card(request)
    
    # Assert that create_card returns 200
    assert response.status_code == 200

@pytest.mark.django_db
def test_check_created_card(server,card):
    user_data = card[0]
    uuid_data = card[1]

    # Check the created card exists
    factory = RequestFactory()
    request = factory.post(reverse(CARD_VIEWS['CHECK_CARD']), uuid_data)
    request.session = {'username' : user_data['Username'],'password' : user_data['Password']}
    request.headers = uuid_data
    
    response = check_card(request)

    # Assert that create_card returns 200
    assert response.status_code == 200

@pytest.mark.django_db
def test_delete_card(server,card):
    user_data = card[0]
    uuid_data = card[1]
    print("uuid_data", uuid_data)
    # Check the created card exists
    factory = RequestFactory()
    request = factory.post(reverse(CARD_VIEWS['DELETE_CARD']), uuid_data)
    request.session = {'username' : user_data['Username'],'password' : user_data['Password']}
    request.headers = uuid_data
    
    response = delete_card(request)

    # Assert that create_card returns 200
    assert response.status_code == 200

@pytest.mark.django_db
def test_delete_card_that_doesnt_exist(server,card):
    user_data = card[0]
    uuid_data = {'UUID' : uuid.uuid4()}
    # Check the created card exists
    factory = RequestFactory()
    request = factory.post(reverse(CARD_VIEWS['DELETE_CARD']), uuid_data)
    request.session = {'username' : user_data['Username'],'password' : user_data['Password']}
    request.headers = uuid_data
    
    response = delete_card(request)

    # Assert that create_card returns 404 (not found)
    assert response.status_code == 404

@pytest.mark.django_db
def test_rename_card(server,card):
    user_data = card[0]
    uuid_data = card[1]
    # Check the created card exists
    factory = RequestFactory()
    request = factory.post(reverse(CARD_VIEWS['RENAME_CARD']), uuid_data)
    request.session = {'username' : user_data['Username'],'password' : user_data['Password']}
    request.headers = uuid_data
    
    response = delete_card(request)

    # Assert that create_card returns 404 (not found)
    assert response.status_code == 404