from celery import task, chunks
from celery.schedules import crontab
from .models import Event
from django.contrib.contenttypes.models import ContentType, ContentTypeManager


@task(bind=True, default_retry_delay=10)
def event_creator(self, instance_id, type_id):
    type = ContentType.objects.get_for_id(type_id)
    instance = type.get_object_for_this_type(id=instance_id)
    Event.objects.create(content_object=instance, author=instance.get_author(), title=instance.get_description())

