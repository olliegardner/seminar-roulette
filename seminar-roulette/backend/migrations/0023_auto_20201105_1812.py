# Generated by Django 3.1.2 on 2020-11-05 18:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0022_auto_20201105_1709'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='seminar',
            unique_together={('title', 'start_time', 'end_time', 'speaker')},
        ),
    ]
