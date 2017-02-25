from django.contrib import admin
from .models import Like
from django.contrib.contenttypes.admin import GenericInlineModelAdmin


class LikesInLine(admin.StackedInline, GenericInlineModelAdmin):
    model = Like
    ct_field = 'content_type'
    ct_fk_field = 'object_id'
    extra = 0


class LikeAbleAdmin(admin.ModelAdmin):
    inlines = [LikesInLine]

    class Meta:
        abstract = True


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    pass
