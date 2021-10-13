# Generated by Django 3.1.12 on 2021-10-12 11:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_auto_20211012_1428'),
    ]

    operations = [
        migrations.CreateModel(
            name='DispatchTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('driver', models.CharField(max_length=300)),
                ('vehical_no', models.CharField(max_length=10)),
                ('cell_no', models.CharField(blank=True, max_length=12, null=True)),
                ('bulty_no', models.CharField(max_length=30)),
                ('gate_pass', models.CharField(max_length=300)),
                ('party_order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.partyorder')),
            ],
        ),
    ]