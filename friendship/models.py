from __future__ import unicode_literals

from django.db import models
from core.models import User


class Friendship(models.Model):
    initiator = models.ForeignKey(User, blank=False)
    recipient = models.ForeignKey(User, blank=False)
    approved = models.BooleanField(default=False)


class Friends(models.Model):
    first = models.ForeignKey(User, blank=False)
    second = models.ForeignKey(User, blank=False)
