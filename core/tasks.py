# coding: utf-8

from celery import task, chord
from .utils import send_mail_to_user
from .models import User
from feed.tasks import send_to_subscribers, send_results_to_admins
from .models import Subscribe


@task(bind=True, default_retry_delay=10)
def send_activation_email(self, user_id):
    user = User.objects.get(id=user_id)
    try:
        send_mail_to_user('confirmation', 'soNet@admin.ru', user)
    except Exception as exc:
        raise self.retry(exc=exc)


@task(bind=True)
def periodic_broadcast(self):
    subs = Subscribe.objects.all()
    # res = send_to_subscribers.chunks(zip(map(lambda x: x.user.id, subs)), 4).apply_async()
    group = send_to_subscribers.chunks(zip(map(lambda x: x.user.id, subs)), 4).group()
    chord(group)(send_results_to_admins.s())
