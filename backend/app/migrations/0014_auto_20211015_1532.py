# Generated by Django 3.1.12 on 2021-10-15 10:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_salesofficer_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recovery',
            name='party',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='app.party'),
            preserve_default=False,
        ),
    ]
