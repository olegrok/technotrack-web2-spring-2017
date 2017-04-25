from celery import task, chunks
from celery.schedules import crontab
from .models import Event
from django.contrib.contenttypes.models import ContentType, ContentTypeManager


@task(bind=True, default_retry_delay=10)
def event_creator(self, obj):
    print obj[0], obj[1]
    try:
        type = ContentType.objects.get_for_id(obj[1])
        instance = type.get_object_for_this_type(id=obj[0])
        Event.objects.create(content_object=instance, author=instance.get_author(), title=instance.get_description())
    except Exception as exc:
        raise self.retry(exc=exc)

