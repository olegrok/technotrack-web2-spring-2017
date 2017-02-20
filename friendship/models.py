# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from core.models import User


class FriendshipRequest(models.Model):
    initiator = models.ForeignKey(User, blank=False, related_name='initiator', verbose_name=u'отправитель')
    recipient = models.ForeignKey(User, blank=False, related_name='recipient', verbose_name=u'получатель')
    approved = models.BooleanField(default=False)

    class Meta:
        verbose_name = u'запрос дружбы'
        verbose_name_plural = u'запросы дружбы'


class Friendship(models.Model):
    first = models.ForeignKey(User, blank=False, related_name='first')
    second = models.ForeignKey(User, blank=False, related_name='second')

    class Meta:
        verbose_name = u'Дружба'
        verbose_name_plural = u'Дружбы'
