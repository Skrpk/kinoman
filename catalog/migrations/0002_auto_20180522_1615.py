# Generated by Django 2.0.2 on 2018-05-22 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='film',
            name='director',
        ),
        migrations.AddField(
            model_name='film',
            name='index',
            field=models.IntegerField(null=True),
        ),
    ]
