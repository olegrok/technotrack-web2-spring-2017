# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-11 10:47
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0003_auto_20170220_0719'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='chat',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='chat.Chat', verbose_name='\u0447\u0430\u0442'),
        ),
        migrations.AlterField(
            model_name='userchat',
            name='chat',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chats', to='chat.Chat', verbose_name='\u0447\u0430\u0442'),
        ),
        migrations.AlterField(
            model_name='userchat',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userchats', to=settings.AUTH_USER_MODEL, verbose_name='\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c'),
        ),
        migrations.AlterUniqueTogether(
            name='userchat',
            unique_together=set([('user', 'chat')]),
        ),
    ]
