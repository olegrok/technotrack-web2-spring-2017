# coding: utf-8

from celery import task, chord
from .utils import send_mail_to_user
from .models import User


@task(bind=True, default_retry_delay=10)
def send_activation_email(self, user_id):
    user = User.objects.get(id=user_id)
    try:
        send_mail_to_user('confirmation', 'soNet@admin.ru', user)
    except Exception as exc:
        raise self.retry(exc=exc)




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

    event_list = list(query)

    for q in event_list:
        if q.author.avatar:
            q.avatar = InlineImage('ava_{}.jpeg'.format(q.id), open(q.author.avatar.file.name, 'rb').read(), 'jpeg')
        else:
            q.avatar = None

    context = {
        'events': event_list,
        'user': user,
    }

    email = get_templated_mail('subscribe', context, 'soNet@sub.ru', recipient_list)

    for q in event_list:
        if q.avatar:
            q.avatar.attach_to_message(email)
    email.send()

    return user.email


@task(bind=True)
def send_results_to_admins(self, emails):
    print "ADMEN"
    recipient_list = [admin[0] for admin in settings.ADMINS]
    email = get_templated_mail('subscribe_result', {
        'emails': emails,
    }, 'soNet@sub.ru', recipient_list)
    email.send()
    print emails


@task(bind=True)
def periodic_broadcast(self):
    subs = Subscribe.objects.all()
    # res = send_to_subscribers.chunks(zip(map(lambda x: x.user.id, subs)), 4).apply_async()
    group = send_to_subscribers.chunks(zip(map(lambda x: x.user.id, subs)), 4).group()
    chord(group)(send_results_to_admins.s())