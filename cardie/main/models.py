from django.db import models

class Server(models.Model):
    ip = models.CharField(max_length=256)
    production = models.BooleanField(default=0) # Default is False

    def __str__(self):
        return(self.ip)
