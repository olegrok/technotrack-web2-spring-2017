# coding: utf-8

from celery import task, chunks
from celery.schedules import crontab
from .utils import send_mail_to_user
from .models import User


@task(bind=True, default_retry_delay=10)
def send_activation_email(self, user_id):
    try:
        user = User.objects.get(id=user_id)
    except Exception as exc:
        raise self.retry(exc=exc)

    send_mail_to_user('confirmation', 'soNet@admin.ru', user)


from .models import Subscribe
from feed.models import Event
from django.utils import timezone
import datetime
from django.conf import settings
from templated_email import send_templated_mail, get_templated_mail, InlineImage

@task(bind=True)
def send_to_subscribers(self, id):
    from django.db.models import Q
    yesterday = timezone.now() - datetime.timedelta(15)
    query = Event.objects.all() \
        .filter(Q(author__friendship__friend__id=id) & Q(created__gt=yesterday)) \
        .distinct().order_by('-created').prefetch_related('author', 'content_object')

    user = User.objects.get(pk=id)
    recipient_list = [user.email, ]
    if settings.DEBUG:
        recipient_list = [admin[0] for admin in settings.ADMINS]

    avas = dict()
    for q in query:
        if q.author.avatar:
            avas[q.author.username] = InlineImage(q.author.avatar.file.name, q.author.avatar.file.read())
        print avas

    email = get_templated_mail('subscribe', {
        'events': query,
        'avas': avas,
        'user': user,
    }, 'soNet@sub.ru', recipient_list)

    email.send()

    print query
    return user.email


@task(bind=True)
def periodic_broadcast(self):
    subs = Subscribe.objects.all()
    # print subs
    # print dir(Subscribe.objects.all())
    res = send_to_subscribers.chunks(zip(map(lambda x: x.user.id, subs)), 4)()