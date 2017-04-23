from django.contrib import admin
from .models import Like
from django.contrib.contenttypes.admin import GenericStackedInline


class LikesInLine(GenericStackedInline):
    model = Like
    can_delete = True
    extra = 2


class LikeAbleAdmin(admin.ModelAdmin):
    inlines = [LikesInLine, ]

    class Meta:
        abstract = True


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    pass
