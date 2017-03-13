# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from core.models import User
from ugc.models import EventAble


class FriendshipRequest(models.Model):
    initiator = models.ForeignKey(User, blank=False, related_name='initiator', verbose_name=u'отправитель')
    recipient = models.ForeignKey(User, blank=False, related_name='recipient', verbose_name=u'получатель')
    approved = models.BooleanField(default=False)

    def __unicode__(self):
        if self.approved:
            status = u'Подтверждено'
        else:
            status = u'Не подтверждено'
        return u'[{}] {} -> {}'.format(status, self.initiator, self.recipient)

    class Meta:
        unique_together = (('initiator', 'recipient'),)
        verbose_name = u'запрос дружбы'
        verbose_name_plural = u'запросы дружбы'


class Friendship(EventAble):
    friend = models.ForeignKey(User, blank=False, related_name='friends')

    def __unicode__(self):
        return u'{} -> {}'.format(self.author.username, self.friend.username)

    def get_description(self):
        return u'{} добавил в друзья {}'.format(self.author.username, self.friend.username)

    def get_author(self):
        return self.author

    class Meta:
        verbose_name = u'Дружба'
        verbose_name_plural = u'Дружбы'
