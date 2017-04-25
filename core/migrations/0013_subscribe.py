# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-24 21:17
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_auto_20170424_0443'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subscribe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscribes', to=settings.AUTH_USER_MODEL, verbose_name='\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c')),
            ],
            options={
                'verbose_name': '\u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0430',
                'verbose_name_plural': '\u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0438',
            },
        ),
    ]