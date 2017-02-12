from __future__ import unicode_literals

from django.db import models
from core.models import User


class Friendship(models.Model):
    initiator = models.ForeignKey(User, blank=False, related_name='initiator')
    recipient = models.ForeignKey(User, blank=False, related_name='recipient')
    approved = models.BooleanField(default=False)


class Friends(models.Model):
    first = models.ForeignKey(User, blank=False, related_name='first')
    second = models.ForeignKey(User, blank=False, related_name='second')
