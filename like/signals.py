# coding: utf-8

from django.db.models.signals import post_save, pre_save, post_init, post_delete, pre_delete
from django.dispatch import receiver
from .models import Like, LikeAble
from feed.models import Event, Achieve

likes_for_achieve = 2


def post_init_like(instance, *args, **kwargs):
    if instance.content_object:
        instance.likes_was = instance.content_object.likes.count()


def create_like(instance, *args, **kwargs):
    if instance.content_object.likes.count() == likes_for_achieve:
        Achieve.objects.create(content_object=instance.content_object, title=u'100 лайков', author=instance.content_object.author)


def delete_like(instance, *args, **kwargs):
    if instance.likes_was == likes_for_achieve:
        instance.content_object.achieve.first().delete()


post_init.connect(post_init_like, sender=Like)
post_save.connect(create_like, sender=Like)
pre_delete.connect(delete_like, sender=Like)
