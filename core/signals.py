from django.db.models.signals import post_save, pre_save, post_init, post_delete
from django.dispatch import receiver
from .models import User, AccountValidation
from .tasks import send_activation_email


@receiver(post_save, sender=User)
def post_save_user_confirmation(instance, created=False, *args, **kwargs):
    if created:
        if not instance.social_auth.exists():
            AccountValidation.objects.create(user=instance)
            send_activation_email.apply_async([instance.id, ], countdown=5)
        else:
            instance.confirmed = True
            instance.save()

