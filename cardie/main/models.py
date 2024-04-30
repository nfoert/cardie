from colorfield.fields import ColorField
from django.db import models
from authentication.models import User

class Server(models.Model):
    ip = models.CharField(max_length=256)
    production = models.BooleanField(default=0) # Default is False

    def __str__(self):
        return(self.ip)

class Card(models.Model):
    layout_choices = {
        "LE": "Left",
        "RI": "Right",
        "CE": "Center"
    }

    name = models.CharField(max_length=256)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    layout = models.CharField(choices=layout_choices, max_length=128)
    user_name = models.CharField(max_length=128)
    user_pronouns = models.CharField(max_length=128)
    text_info = models.JSONField(default=dict, blank=True)
    link_info = models.JSONField(default=dict, blank=True)
    background_color = ColorField(default="#FF0000")

    def __str__(self):
        return(f"{self.owner.username}'s Card, '{self.name}'")

