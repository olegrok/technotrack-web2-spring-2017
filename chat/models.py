# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from core.models import Named, Authored, Dated, User


class Chat(Named, Authored, Dated):
    pass

    class Meta:
        verbose_name = u'чат'
        verbose_name_plural = u'чаты'


class UserChat(models.Model):
    user = models.ForeignKey(User, related_name='user', verbose_name=u'пользователь')
    chat = models.ForeignKey(Chat, related_name='chat', verbose_name=u'чат')

    class Meta:
        verbose_name = u'чат пользователя'
        verbose_name_plural = u'чаты пользователя'


class Message(Authored, Dated):
    content = models.TextField(max_length=1024, verbose_name=u'сообщщение')
    chat = models.ForeignKey(Chat, related_name='char', verbose_name=u'чат')

    class Meta:
        verbose_name = u'сообщение'
        verbose_name_plural = u'сообщения'

