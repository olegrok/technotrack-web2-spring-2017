from django.db.models.signals import post_save, pre_save, post_init, post_delete, pre_delete
from django.dispatch import receiver
from .models import EventAble, Event


def create_event(instance, *args, **kwargs):
    if not instance.event.exists():
        Event.objects.create(content_object=instance, author=instance.get_author(), title=instance.get_description())


def delete_event(instance, *args, **kwargs):
    instance.event.remove()

for model in EventAble.__subclasses__():
    post_save.connect(create_event, sender=model)
    pre_delete.connect(delete_event, sender=model)
