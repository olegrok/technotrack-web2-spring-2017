# coding: utf-8

from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class User(AbstractUser):
    avatar = models.ImageField(u'фото', blank=True, upload_to='avatars')

    class Meta:
        verbose_name = u'пользователь'
        verbose_name_plural = u'пользователи'


class Dated(models.Model):
    created = models.DateTimeField(auto_now_add=True, verbose_name=u'дата создания')
    updated = models.DateTimeField(auto_now=True, verbose_name=u'дата изменения')

    class Meta:
        verbose_name = u'датированный'
        verbose_name_plural = u'датированные'
        abstract = True


class Named(models.Model):
    title = models.CharField(max_length=128, blank=False, verbose_name=u'заголовок')

    def get_title(self):
        return self.title

    class Meta:
        abstract = True
        verbose_name = u'названный'
        verbose_name_plural = u'названные'


class Authored(models.Model):
    author = models.ForeignKey(User, verbose_name=u'автор')

    class Meta:
        abstract = True
        verbose_name = u'имеющий автора'
        verbose_name_plural = u'имеющие автора'


class Attached(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        abstract = True
        verbose_name = u'принадлежащий'
        verbose_name = u'принадлежащие'
