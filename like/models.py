# coding: utf-8

from __future__ import unicode_literals

from django.db import models
from core.models import Authored, Dated, Attached
from feed.models import Achieve
from django.contrib.contenttypes.fields import GenericRelation


class Like(Authored, Dated, Attached):

    def __unicode__(self):
        return u'Like to {} {} by {}'.format(str(self.content_object), self.content_object.pk, self.author.username)

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

    achieve = GenericRelation(
        Achieve,
        content_type_field='content_type',
        object_id_field='object_id'
    )

    class Meta:
        abstract = True


