# coding: utf-8

from __future__ import unicode_literals
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse
from django.utils import timezone
import uuid


class User(AbstractUser):
    avatar = models.ImageField(u'фото', blank=True, upload_to=u'avatars')
    confirmed = models.BooleanField(default=False, verbose_name=u'подтверждение')
    email = models.EmailField(blank=False, verbose_name=_('e-mail address'))

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

    def get_author(self):
        return NotImplementedError


class Attached(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        abstract = True
        verbose_name = u'принадлежащий'
        verbose_name_plural = u'принадлежащие'


class AccountValidation(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, unique=True)
    user = models.OneToOneField(User, related_name=u'confirmation', blank=False, verbose_name='пользователь')
    created = models.DateTimeField(auto_now_add=True, verbose_name=u'дата создания')
    confirmed_date = models.DateTimeField(verbose_name=u'дата подтверждения', editable=True, blank=True, null=True)
    confirmed = models.BooleanField(default=False, verbose_name=u'подтверждение')

    class Meta:
        verbose_name = u'подтверждение аккаунта'
        verbose_name_plural = u'подтверждения аккаунтов'

    def confirm(self):
        self.user.confirmed = True
        self.user.save()
        self.confirmed = True
        self.save()

    def update_uuid(self):
        from .tasks import send_activation_email
        self.uuid = uuid.uuid4()
        self.created = timezone.now()
        self.save()
        send_activation_email.apply_async([self.user.id, ])

    def __str__(self):
        return self.user.username

    # todo adequate url
    def get_absolute_url(self):
        return 'http://localhost:8080{}'.format(reverse('core:confirmation', kwargs={
            'pk': self.pk,
            'slug': self.uuid,
        }))
