from django import forms
from .models import Profile, User
from django.core.exceptions import ValidationError


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

    def clean_profile_image(self):
        image = self.cleaned_data.get('profile_image', False)
        if image:
            if image.size > 2 * 1024 * 1024:
                raise ValidationError(
                    "Image size is too large! Please upload an image smaller than 2MB."
                )
            return image
        else:
            raise ValidationError("Couldn't read uploaded image")
