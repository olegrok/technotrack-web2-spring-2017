# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from core.models import User
from ugc.models import EventAble


class FriendshipRequest(models.Model):
    initiator = models.ForeignKey(User, blank=False, related_name='initiator', verbose_name=u'отправитель')
    recipient = models.ForeignKey(User, blank=False, related_name='recipient', verbose_name=u'получатель')
    approved = models.BooleanField(default=False)

    class Meta:
        verbose_name = u'запрос дружбы'
        verbose_name_plural = u'запросы дружбы'


class Friendship(EventAble):
    first = models.ForeignKey(User, blank=False, related_name='first')
    second = models.ForeignKey(User, blank=False, related_name='second')

    def __str__(self):
        return u'{} -> {}'.format(self.first.username, self.second.username)

    def get_description(self):
        return u'{} добавил в друзья {}'.format(self.first.username, self.second.username)

    def get_author(self):
        return self.first

    class Meta:
        unique_together = (('first', 'second'),)
        verbose_name = u'Дружба'
        verbose_name_plural = u'Дружбы'
