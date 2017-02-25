# coding: utf-8

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User
from ugc.models import Post


class PostsInLine(admin.StackedInline):
    model = Post
    can_delete = True
    extra = 0


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        ('User info', {'fields': (
        'username', 'password', 'first_name', 'last_name', 'email', 'avatar', 'is_staff', 'is_superuser',)}),
    )
    inlines = [PostsInLine, ]
