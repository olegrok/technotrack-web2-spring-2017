from django.conf.urls import url
from .views import home, UserProfileView, login

urlpatterns = [
    # url(r'^social/myauth/$', VkView.as_view(), name='vkauth'),
    url(r'^login/$', login, name='login'),
    url(r'^profile/$', UserProfileView.as_view(), name='profile'),
    url(r'$', home, name='home'),
]