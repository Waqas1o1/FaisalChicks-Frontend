# Generated by Django 3.1.12 on 2021-10-23 11:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0020_auto_20211021_1547'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recovery',
            name='description',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
