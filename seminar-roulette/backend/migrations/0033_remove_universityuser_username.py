# Generated by Django 3.1.2 on 2020-12-07 21:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0032_auto_20201207_2141'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='universityuser',
            name='username',
        ),
    ]