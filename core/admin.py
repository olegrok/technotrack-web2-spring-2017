# coding: utf-8

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, AccountValidation, Subscribe
from ugc.models import Post
from .views import RegistrationForm


def make_confirmed(modeladmin, request, queryset):
    queryset.update(confirmed=True)
make_confirmed.short_description = u'Confrm'


class PostsInLine(admin.StackedInline):
    model = Post
    can_delete = True
    extra = 0


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        ('User info', {'fields': (
        'username', 'password', 'first_name', 'last_name', 'email', 'avatar', 'is_staff', 'is_superuser', 'confirmed')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide', 'extrapretty'),
            'fields': ('username', 'email', 'password1', 'password2',)}
         ),
    )

    actions = [make_confirmed, ]
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'confirmed', 'id', )
    add_form = RegistrationForm


@admin.register(AccountValidation)
class AccountValidationAdmin(admin.ModelAdmin):
    readonly_fields = ['uuid', 'created', ]
    fields = ['user', 'confirmed', 'confirmed_date', 'uuid', 'created', ]
    list_display = ('__str__', 'created', 'confirmed_date', 'confirmed', )


@admin.register(Subscribe)
class SubscribeAdmin(admin.ModelAdmin):
    pass
