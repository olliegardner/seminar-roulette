# Generated by Django 3.1.2 on 2020-11-10 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0025_auto_20201110_1236'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seminargroup',
            name='location',
            field=models.ManyToManyField(blank=True, to='backend.Location'),
        ),
    ]
