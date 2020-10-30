# Generated by Django 3.1.2 on 2020-10-29 21:33

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0015_auto_20201026_1745'),
    ]

    operations = [
        migrations.CreateModel(
            name='SeminarHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attended', models.BooleanField(default=False)),
                ('rating', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)])),
                ('seminar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.seminar')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddConstraint(
            model_name='seminarhistory',
            constraint=models.CheckConstraint(check=models.Q(('rating__gte', 1), ('rating__lte', 10)), name='Rating must be between 1 and 10'),
        ),
        migrations.AlterUniqueTogether(
            name='seminarhistory',
            unique_together={('seminar', 'user')},
        ),
    ]