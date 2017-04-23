from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'application.settings')
app = Celery('application')

app.config_from_object('django.conf:settings', namespace='CELERY')

# app.autodiscover_tasks()
# app.conf.beat_schedule = {
#     'every-5sec': {
#         'task': 'templated_email.tasks.degug_task',
#         'schedule': crontab(),
#         'args': (16, ),
#     }
# }
#
# @app.task(bind=True)
# def debug_task(self):
#     print('Request: {0!r}'.format(self.request))
