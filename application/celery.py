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

app.conf.beat_schedule = {
    'add-every-day': {
        'task': 'core.tasks.periodic_broadcast',
        # 'schedule': crontab(),
        'schedule': crontab(),
        'args': (),
    },
}
