# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from core.models import Named, Authored, Dated, User


class Chat(Named, Authored, Dated):
    def __unicode__(self):
        return u'[{}] {}'.format(self.pk, self.title)

    def get_author(self):
        return self.author

    class Meta:
        verbose_name = u'чат'
        verbose_name_plural = u'чаты'


class UserChat(models.Model):
    user = models.ForeignKey(User, related_name='userchats', verbose_name=u'пользователь')
    chat = models.ForeignKey(Chat, related_name='chats', verbose_name=u'чат')

    def __unicode__(self):
        return u'{} in {}'.format(self.user.username, self.chat.title)

    class Meta:
        verbose_name = u'чат пользователя'
        verbose_name_plural = u'чаты пользователя'
        unique_together = (('user', 'chat'), )


class Message(Authored, Dated):
    content = models.TextField(max_length=1024, verbose_name=u'сообщщение')
    chat = models.ForeignKey(Chat, related_name='messages', verbose_name=u'чат')

    def __unicode__(self):
        return u'{} in {}: {}'.format(self.author.username, self.chat.title, self.content[:10])
    
    class Meta:
        verbose_name = u'сообщение'
        verbose_name_plural = u'сообщения'

