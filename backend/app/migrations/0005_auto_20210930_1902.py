# Generated by Django 3.0 on 2021-09-30 14:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_auto_20210930_1306'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recovery',
            name='party_order',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app.PartyOrder'),
        ),
    ]
