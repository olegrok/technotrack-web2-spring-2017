from django.conf.urls import url
from .views import home, UserProfileView

urlpatterns = [
    # url(r'^social/myauth/$', VkView.as_view(), name='vkauth'),
    url(r'^login/$', home, name='home'),
    url(r'^profile/$', UserProfileView.as_view(), name='profile')

]