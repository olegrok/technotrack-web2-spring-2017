# coding: utf-8

from celery import task
from .utils import send_mail_to_user
from .models import User


@task(bind=True, default_retry_delay=10)
def send_activation_email(self, user_id):
    try:
        user = User.objects.get(id=user_id)
    except Exception as exc:
        raise self.retry(exc=exc)

    send_mail_to_user('confirmation', 'soNet@admin.ru', user)

