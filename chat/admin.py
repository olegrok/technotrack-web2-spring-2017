from django.contrib import admin
from .models import Chat, UserChat, Message
from core.models import User


class MessageChatsInLine(admin.TabularInline):
    model = Message
    can_delete = True
    extra = 1
    fields = ('author', 'content')


class UserChatsInLine(admin.TabularInline):
    model = UserChat
    can_delete = True
    extra = 1
    fields = ('user',)


@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    inlines = [UserChatsInLine, MessageChatsInLine, ]
    pass


@admin.register(UserChat)
class UserChatAdmin(admin.ModelAdmin):
    # inlines = [UsersInLine, ]
    pass


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    pass
