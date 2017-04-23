# coding: utf-8

from django.shortcuts import render, get_object_or_404
from django.views.generic import DetailView, UpdateView
from .models import User, AccountValidation
from django.views.generic.edit import CreateView
from django.urls import reverse
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.db.models import Q
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.forms import AuthenticationForm


class UserProfileView(DetailView):
    template_name = 'core/profile.html'
    model = User

    def get_object(self, queryset=None):
        return get_object_or_404(User, pk=self.request.user.pk)

    def get_context_data(self, **kwargs):
        context = super(UserProfileView, self).get_context_data(**kwargs)
        # user = self.request.user

        # print type(user.social_auth.get(provider='vk-oauth2'))
        # print dir(user.social_auth.get(provider='vk-oauth2'))
        # print user.social_auth.get(provider='vk-oauth2')

        # print VKOAuth2.get_scope()
        # print self.request.user.social_auth.get_social_auth(provider='vk-oauth2',uid='e-mail')
        return context


def home(request):
    return render(request, template_name='core/index.html')


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


class RegisterView(CreateView):
    model = User
    template_name = 'core/registration.html'
    form_class = RegistrationForm
    success_url = 'core:login'

    def get_success_url(self):
        return reverse(self.success_url)


class AccountValidationView(DetailView):
    model = AccountValidation
    template_name = 'core/confirmation.html'
    context_object_name = 'validator'
    slug_url_kwarg = 'slug'
    slug_field = 'uuid'
    query_pk_and_slug = True

    def dispatch(self, request, *args, **kwargs):
        print 'dispatch'
        return super(AccountValidationView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        print 'get_context_data'
        context = super(AccountValidationView, self).get_context_data(**kwargs)
        print context
        object = context.get('object')
        if object and not object.confirmed:
            context['Message'] = u'Подтверждено'
        else:
            context['validator'] = None
        return context


