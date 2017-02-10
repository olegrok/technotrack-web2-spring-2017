from __future__ import unicode_literals

from django.db import models
from core.models import Authored, Dated, Named


class Post(Authored, Dated):
    content = models.TextField(max_length=1024, blank=False)


class Event(Authored, Dated, Named):
    place = models.CharField(max_length=64)
    description = models.TextField(blank=True)
    photo = models.ImageField(blank=True)
