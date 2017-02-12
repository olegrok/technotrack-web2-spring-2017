from django.contrib import admin
from .models import Friends, Friendship

admin.site.register([Friends, Friendship])