# coding: utf-8

from __future__ import unicode_literals

from django.db import models
from core.models import Authored, Dated, Attached
from django.contrib.contenttypes.fields import GenericRelation


class Like(Authored, Dated, Attached):
    class Meta:
        unique_together = (('author', 'content_type', 'object_id'),)
        verbose_name = u'лайк'
        verbose_name_plural = u'лайки'


class LikeAble(models.Model):
    likes = GenericRelation(
        Like,
        content_type_field='content_type',
        object_id_field='object_id'
    )

    class Meta:
        abstract = True


