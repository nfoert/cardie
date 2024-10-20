from django.db import models

class User(models.Model):
    username = models.CharField(max_length=64)
    password = models.CharField(max_length=512)
    email = models.CharField(max_length=256)
    date_created = models.DateTimeField(blank=True)
    wallet = models.ManyToManyField("main.Card")

    def __str__(self):
        return(self.username)


class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to='profile_images/',default='default_images/default_profile.jpg')
    bio = models.CharField(max_length=256, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user}'s profile image"