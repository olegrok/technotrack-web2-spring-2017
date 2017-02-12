from django.contrib import admin
from .models import Post, Event

admin.site.register([Post, Event])
