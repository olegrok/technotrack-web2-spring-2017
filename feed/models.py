# coding: utf-8

from __future__ import unicode_literals
from django.contrib.contenttypes.fields import GenericRelation, ContentType
from django.db import models
from core.models import Authored, Dated, Named, Attached


class Event(Authored, Dated, Named, Attached):
    class Meta:
        verbose_name = u'Событие'
        verbose_name_plural = u'События'

    def get_title(self):
        return self.title

    def __unicode__(self):
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


class Achieve(Dated, Named, Attached, EventAble):

    def get_description(self):
        return u'{} получил достижение {}'.format(self.content_object.get_author().username, self.title)

    def __unicode__(self):
        return self.title

    def get_author(self):
        return self.content_object.author

    class Meta:
        verbose_name = u'Достижение'
        verbose_name_plural = u'Достижения'

