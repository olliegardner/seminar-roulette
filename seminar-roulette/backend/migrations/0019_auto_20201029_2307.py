# Generated by Django 3.1.2 on 2020-10-29 23:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0018_seminarhistory_discard'),
    ]

    operations = [
        migrations.RenameField(
            model_name='seminarhistory',
            old_name='discard',
            new_name='discarded',
        ),
    ]