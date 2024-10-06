from django.db import models
from authentication.models import User
import uuid

class Server(models.Model):
    ip = models.CharField(max_length=256)
    production = models.BooleanField(default=0) # Default is False

    allow_create_accounts = models.BooleanField(default=1)
    allow_sign_in = models.BooleanField(default=1)

    def __str__(self):
        return(self.ip)

class Card(models.Model):
    uuid = models.UUIDField()
    name = models.CharField(max_length=256)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    card_last_edited_on = models.DateTimeField(blank=True, null=True)
    card_created_on = models.DateTimeField(blank=True, null=True)
    data = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return(f"{self.owner.username}'s Card, '{self.name}'")

class TempCard(models.Model):
    # A temporary card used when the user tries the editor and then goes to create an account
    uuid = models.UUIDField(default=uuid.uuid4)
    data = models.JSONField(default=dict, blank=True)
    created = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return(f"Temporary card created on '{self.created}'")
