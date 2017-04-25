# coding: utf-8
from __future__ import unicode_literals
from django.db import models
from core.models import Authored, Dated, Named, Attached
from like.models import LikeAble
from feed.models import EventAble
from django.contrib.contenttypes.fields import GenericRelation
from feed.models import Event


class Post(LikeAble, EventAble):
    content = models.TextField(blank=False, verbose_name=u'содержание')
    event = GenericRelation(Event)

    class Meta:
        verbose_name = u'Пост'
        verbose_name_plural = u'Посты'

    def get_description(self):
        return u'{} написал пост'.format(self.author.username)

    def get_author(self):
        return self.author

    def __str__(self):
        return '{}: {}'.format(self.author.username, self.content[:20])
