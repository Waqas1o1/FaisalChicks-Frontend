# Generated by Django 3.1.12 on 2021-11-18 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0026_recovery_attachments'),
    ]

    operations = [
        migrations.AlterField(
            model_name='party',
            name='email',
            field=models.EmailField(max_length=30),
        ),
        migrations.AlterField(
            model_name='partyorder',
            name='description',
            field=models.CharField(blank=True, max_length=30000, null=True),
        ),
    ]
