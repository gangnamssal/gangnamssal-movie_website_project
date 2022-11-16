# Generated by Django 3.2.13 on 2022-11-16 14:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0004_auto_20221116_1739'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='user',
        ),
        migrations.AlterField(
            model_name='comment',
            name='review',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='movies.review'),
        ),
    ]
