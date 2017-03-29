from .models import UserChat, Chat
from django.db.models.signals import post_save


def create_userChat(instance, created=False, *args, **kwargs):
    if created:
        UserChat.objects.create(chat=instance, user=instance.get_author())

post_save.connect(create_userChat, sender=Chat)