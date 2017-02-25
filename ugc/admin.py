from django.contrib import admin
from .models import Post, Event
# from like.admin import LikesInLine
from like.admin import LikeAbleAdmin


@admin.register(Post)
class PostAdmin(LikeAbleAdmin):
    pass


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    pass
