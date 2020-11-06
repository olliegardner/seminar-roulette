# Generated by Django 3.1.2 on 2020-11-04 21:22

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0020_auto_20201104_2118'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seminarhistory',
            name='rating',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=2, null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)]),
        ),
    ]