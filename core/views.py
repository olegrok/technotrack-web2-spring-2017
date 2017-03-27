from django.shortcuts import render, get_object_or_404
from django.views.generic import DetailView
from .models import User


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
