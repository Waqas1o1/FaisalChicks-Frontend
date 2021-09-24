# Generated by Django 3.0 on 2021-09-20 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0002_remove_expectedcustomers_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='partyorder',
            name='category',
        ),
        migrations.AddField(
            model_name='expectedcustomers',
            name='category',
            field=models.CharField(choices=[('Farmer', 'Farmer'), ('Dealer', 'Dealer'), ('Distributer', 'Distributer')], default=1, max_length=15),
            preserve_default=False,
        ),
    ]