from django.contrib import admin
from django.contrib.contenttypes.admin import GenericStackedInline
from .models import Post
from like.models import Like
# from like.admin import LikesInLine
from like.admin import LikeAbleAdmin


class LikesInLine(GenericStackedInline):
    model = Like
    can_delete = True
    extra = 2

@admin.register(Post)
class PostAdmin(LikeAbleAdmin):
    inlines = [LikesInLine, ]