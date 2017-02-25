from django.db.models.signals import post_save, pre_save, post_init, post_delete
from django.dispatch import receiver
from .models import FriendshipRequest, Friendship


@receiver(post_init, sender=FriendshipRequest)
def pre_save_approve_create_friendship(instance, *args, **kwargs):
    instance.approved_was = instance.approved


@receiver(post_save, sender=FriendshipRequest)
def post_save_approve_create_friendship(instance, created=False, *args, **kwargs):
    if not instance.approved_was and instance.approved:
        Friendship.objects.create(first=instance.initiator, second=instance.recipient)
        Friendship.objects.create(first=instance.recipient, second=instance.initiator)


@receiver(post_delete, sender=FriendshipRequest)
def post_delete_friend(instance, *args, **kwargs):
        Friendship.objects.get(first=instance.initiator, second=instance.recipient).delete()
        Friendship.objects.get(first=instance.recipient, second=instance.initiator).delete()
