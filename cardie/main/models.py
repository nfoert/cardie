from colorfield.fields import ColorField
from django.db import models
from authentication.models import User

class Server(models.Model):
    ip = models.CharField(max_length=256)
    production = models.BooleanField(default=0) # Default is False

    def __str__(self):
        return(self.ip)

class Card(models.Model):
    uuid = models.CharField(max_length=36, default="")
    name = models.CharField(max_length=256)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    
    data = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return(f"{self.owner.username}'s Card, '{self.name}'")

