# coding: utf-8

from django.shortcuts import render, get_object_or_404
from django.views.generic import DetailView, UpdateView
from .models import User, AccountValidation
from django.views.generic.edit import CreateView
from django.urls import reverse
from django.contrib.auth.views import LoginView as BaseLoginView
from django.utils import timezone
from .forms import AuthenticationForm, RegistrationForm
from django.conf import settings
import datetime


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

    def get_context_data(self, **kwargs):
        context = super(AccountValidationView, self).get_context_data(**kwargs)
        obj = context.get('object')
        if obj and not obj.confirmed:
            if (timezone.now() - obj.created) < datetime.timedelta(settings.ACCOUNT_ACTIVATION_DAYS):
                context['expired'] = False
                context['validator'].confirm()
            else:
                context['expired'] = True
                context['validator'].update_uuid()
        else:
            context['validator'] = None
        return context


class LoginView(BaseLoginView):
    form_class = AuthenticationForm

    def __init__(self, **kwargs):
        super(LoginView, self).__init__(**kwargs)




