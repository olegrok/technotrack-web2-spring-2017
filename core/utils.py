from django.core.mail import EmailMessage
from django.conf import settings
from templated_email import send_templated_mail, get_templated_mail, InlineImage


def send_mail(from_email, recipient_list, attachments=[]):
    if settings.DEBUG:
        recipient_list = [admin[0] for admin in settings.ADMINS]

    email = get_templated_mail('mail', {
        # 'image': InlineImage('image.jpeg', open('./static/image.jpeg', 'rb').read(), 'jpeg'),
    }, from_email, recipient_list)
    email.send()


def send_mail_to_user(template, from_email, user):
    recipient_list = [user.email, ]
    if settings.DEBUG:
        recipient_list = [admin[0] for admin in settings.ADMINS]

    email = get_templated_mail(template, {
        'image': InlineImage('continue.jpeg', open('./static/continue.jpeg', 'rb').read(), 'jpeg'),
        'user': user,
    }, from_email, recipient_list)
    # img = InlineImage('continue.jpeg', open('./static/continue.jpeg', 'rb').read(), 'jpeg')
    # img.attach_to_message(email)
    email.send()
