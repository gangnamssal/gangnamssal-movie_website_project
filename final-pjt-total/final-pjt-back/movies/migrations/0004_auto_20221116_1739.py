# Generated by Django 3.2.13 on 2022-11-16 08:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0003_review_movie'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='like_review_users',
        ),
        migrations.RemoveField(
            model_name='review',
            name='user',
        ),
    ]
