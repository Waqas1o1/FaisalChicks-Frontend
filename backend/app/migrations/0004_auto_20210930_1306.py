# Generated by Django 3.0 on 2021-09-30 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_auto_20210930_1232'),
    ]

    operations = [
        migrations.AddField(
            model_name='party',
            name='creditLimit',
            field=models.FloatField(default=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='party',
            name='salesTarget',
            field=models.FloatField(default=100),
            preserve_default=False,
        ),
    ]