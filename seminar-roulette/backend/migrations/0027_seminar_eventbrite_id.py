# Generated by Django 3.1.2 on 2020-11-18 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0026_auto_20201110_1236'),
    ]

    operations = [
        migrations.AddField(
            model_name='seminar',
            name='eventbrite_id',
            field=models.IntegerField(blank=True, null=True, unique=True),
        ),
    ]