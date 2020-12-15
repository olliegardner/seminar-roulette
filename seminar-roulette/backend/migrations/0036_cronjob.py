# Generated by Django 3.1.2 on 2020-12-15 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0035_auto_20201207_2146'),
    ]

    operations = [
        migrations.CreateModel(
            name='CronJob',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('success', models.BooleanField(default=False)),
                ('error_message', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
