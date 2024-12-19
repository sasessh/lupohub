from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User, Group

@receiver(post_save, sender=User)
def add_to_group(sender, instance, created, **kwargs):
    if created:
        # Nazwa grupy, do której przypisać nowych użytkowników
        initial_group, created = Group.objects.get_or_create(name='NoPermissions')
        instance.groups.add(initial_group)
