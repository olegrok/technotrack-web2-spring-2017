# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-22 07:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_auto_20170422_0755'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accountvalidation',
            name='confirmed_date',
            field=models.DateTimeField(blank=True, null=True, verbose_name='\u0434\u0430\u0442\u0430 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f'),
        ),
    ]
