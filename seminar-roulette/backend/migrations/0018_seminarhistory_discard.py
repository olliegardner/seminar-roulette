# Generated by Django 3.1.2 on 2020-10-29 23:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0017_auto_20201029_2151'),
    ]

    operations = [
        migrations.AddField(
            model_name='seminarhistory',
            name='discard',
            field=models.BooleanField(default=False),
        ),
    ]
