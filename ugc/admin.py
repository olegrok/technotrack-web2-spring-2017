from django.contrib import admin

from .models import Post
from like.admin import LikeAbleAdmin


@admin.register(Post)
class PostAdmin(LikeAbleAdmin):
    pass