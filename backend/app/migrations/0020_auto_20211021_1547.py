# Generated by Django 3.1.12 on 2021-10-21 10:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0019_auto_20211016_1724'),
    ]

    operations = [
        migrations.AlterField(
            model_name='partyorder',
            name='description',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
