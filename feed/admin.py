from django.contrib import admin
from django.contrib import admin
from .models import Event, Achieve


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    pass


@admin.register(Achieve)
class AchieveAdmin(admin.ModelAdmin):
    pass

