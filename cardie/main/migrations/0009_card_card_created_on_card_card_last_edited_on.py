# Generated by Django 5.0.3 on 2024-08-04 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_alter_tempcard_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='card_created_on',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='card',
            name='card_last_edited_on',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
