# Generated by Django 3.1.2 on 2020-10-22 13:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20201022_1340'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Host',
            new_name='SeminarGroup',
        ),
    ]