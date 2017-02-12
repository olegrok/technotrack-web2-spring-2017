# coding: utf-8

from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class User(AbstractUser):
    first_name = models.CharField(u'имя', max_length=30, blank=False)
    last_name = models.CharField(u'фамилия', max_length=30, blank=True)
    email = models.EmailField(u'e-mail', blank=False, unique=True)

    class Meta:
        verbose_name = u'пользователь'
        verbose_name_plural = u'пользователи'


class Dated(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Named(models.Model):
    title = models.CharField(max_length=128, blank=False)

    class Meta:
        abstract = True


class Authored(models.Model):
    author = models.ForeignKey(User)

    class Meta:
        abstract = True


class Attached(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        abstract = True



