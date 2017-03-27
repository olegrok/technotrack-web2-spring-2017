from django.conf.urls import url
from .views import UserProfileView
from django.contrib.auth.views import login, logout
from django.contrib.auth.decorators import login_required
from application.settings import LOGIN_URL
from django.contrib.auth.forms import AuthenticationForm

urlpatterns = [
    # url(r'^social/myauth/$', VkView.as_view(), name='vkauth'),
    url(r'^logout/$', login_required(logout, login_url=LOGIN_URL), {'next_page': '/'}, name='logout'),
    url(r'^login/$', login, {'template_name': 'core/login.html',
                             'redirect_authenticated_user': True,
                             'extra_context': {
                                'authform': AuthenticationForm()
                             }}, name='login'),
    url(r'^profile/$', UserProfileView.as_view(), name='profile'),
]