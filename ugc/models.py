# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from core.models import Authored, Dated, Named


class Post(Authored, Dated):
    content = models.TextField(blank=False, verbose_name=u'содержание')

    class Meta:
        verbose_name = u'пост'
        verbose_name_plural = u'посты'


# class Event(Authored, Dated, Named):
#     post = models.ForeignKey(Post)

