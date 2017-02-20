from django.contrib import admin
from .models import FriendshipRequest, Friendship

admin.site.register([FriendshipRequest, Friendship])