# coding: utf-8

from django.contrib.auth.forms import AuthenticationForm as BaseAuthenticationForm
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User


class AuthenticationForm(BaseAuthenticationForm):
    def __init__(self, request=None, *args, **kwargs):
        super(AuthenticationForm, self).__init__(request, *args, **kwargs)

    def confirm_login_allowed(self, user):
        if not user.confirmed:
            raise forms.ValidationError(
                'This account is inactive. Check your e-mail',
                code='inactive',
            )


class RegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'password1', 'password2', 'email',  'first_name', 'last_name', 'avatar']

    def clean_username(self):
        try:
            User.objects.get(username__iexact=self.cleaned_data['username'])
        except User.DoesNotExist:
            return self.cleaned_data['username']
        raise forms.ValidationError("The username already exists. Please try another one.")

    def clean_email(self):
        try:
            User.objects.get(email__iexact=self.cleaned_data['email'])
        except User.DoesNotExist:
            return self.cleaned_data['email']
        raise forms.ValidationError("This e-mail is already used.")

    def clean(self):
        if 'password1' in self.cleaned_data and 'password2' in self.cleaned_data:
            if self.cleaned_data['password1'] != self.cleaned_data['password2']:
                raise forms.ValidationError("The two password fields did not match.")
        return self.cleaned_data
