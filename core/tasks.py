# coding: utf-8

from celery import task
from .utils import send_mail_to_user
from .models import User

@task
def send_activation_email(user_id):
    user = User.objects.get(id=user_id)
    send_mail_to_user('confirmation', 'soNet@admin.ru', user)

