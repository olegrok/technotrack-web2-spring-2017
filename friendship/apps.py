from __future__ import unicode_literals

from django.apps import AppConfig
from django.db.models.signals import post_save

class FriendshipConfig(AppConfig):
    name = 'friendship'

    def ready(self):
        import signals
