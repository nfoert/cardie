# Generated by Django 5.0.3 on 2024-04-25 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='date_created',
            field=models.DateTimeField(blank=True),
        ),
    ]
