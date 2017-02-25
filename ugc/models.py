# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from core.models import Authored, Dated, Named, Attached
from like.models import LikeAble
from django.contrib.contenttypes.fields import GenericRelation, ContentType


class Event(Authored, Dated, Named, Attached):
    class Meta:
        verbose_name = u'Событие'
        verbose_name_plural = u'Событие'

    def __str__(self):
        return self.title


class EventAble(models.Model):
    event = GenericRelation(
        Event,
        content_type_field='content_type',
        object_id_field='object_id',
    )

    def get_description(self):
        return NotImplementedError

    def get_author(self):
        return NotImplementedError

    class Meta:
        abstract = True


class Post(Authored, Dated, LikeAble, EventAble):
    content = models.TextField(blank=False, verbose_name=u'содержание')

    class Meta:
        verbose_name = u'Пост'
        verbose_name_plural = u'Посты'
