from django import forms
from .models import Profile, User



class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email']


class ProfileUpdateForm(forms.ModelForm):
    profile_image = forms.ImageField(
        widget=forms.FileInput(attrs={'class': 'hidden'}),
        required=False
    )
    class Meta:
        model = Profile
        fields = ['profile_image', 'bio']
