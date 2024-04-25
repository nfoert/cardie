from django.db import models

class User(models.Model):
    username = models.CharField(max_length=64)
    password = models.CharField(max_length=512)
    email = models.CharField(max_length=256)
    date_created = models.DateTimeField(blank=True)

    def __str__(self):
        return(self.username)