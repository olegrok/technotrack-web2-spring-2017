# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-26 21:49
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ugc', '0005_auto_20170225_1759'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='author',
        ),
        migrations.RemoveField(
            model_name='event',
            name='content_type',
        ),
        migrations.DeleteModel(
            name='Event',
        ),
    ]
