# Generated by Django 3.1.2 on 2021-01-16 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0043_remove_seminar_similarities'),
    ]

    operations = [
        migrations.AddField(
            model_name='seminar',
            name='serves_food',
            field=models.BooleanField(default=False),
        ),
    ]
