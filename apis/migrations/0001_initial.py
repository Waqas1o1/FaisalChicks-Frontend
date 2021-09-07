# Generated by Django 3.2.6 on 2021-09-06 12:55

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300, unique=True)),
                ('date', models.DateField(blank=True, default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Ledger',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(blank=True, default=django.utils.timezone.now)),
                ('description', models.CharField(max_length=50, null=True)),
                ('transaction_type', models.CharField(choices=[('Debit', 'Debit'), ('Credit', 'Credit')], max_length=50)),
                ('total_amount', models.FloatField(null=True)),
                ('net_balance', models.FloatField(blank=True, default=0.0)),
            ],
        ),
        migrations.CreateModel(
            name='Party',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True)),
                ('contact', models.CharField(max_length=13)),
                ('discount', models.FloatField()),
                ('opening_Balance', models.FloatField()),
                ('current_Balance', models.FloatField(blank=True, null=True)),
                ('date', models.DateField(blank=True, default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='PartyOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(blank=True, default=django.utils.timezone.now)),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Approved', 'Approved')], default='Pending', max_length=50)),
                ('description', models.CharField(max_length=50)),
                ('qty', models.IntegerField()),
                ('rate', models.IntegerField()),
                ('total_amount', models.FloatField(blank=True, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.category')),
                ('party', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.party')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('default_price', models.FloatField(blank=True, default=0)),
                ('date', models.DateField(blank=True, default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='SalesOfficer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('commission', models.FloatField(default=0.0)),
                ('contact', models.CharField(max_length=13)),
                ('opening_Balance', models.FloatField()),
                ('current_Balance', models.FloatField(blank=True, null=True)),
                ('date', models.DateField(blank=True, default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='PartyLedger',
            fields=[
                ('ledger_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='apis.ledger')),
                ('qty', models.IntegerField(null=True)),
                ('rate', models.FloatField(null=True)),
            ],
            bases=('apis.ledger',),
        ),
        migrations.CreateModel(
            name='Recovery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(blank=True, default=django.utils.timezone.now)),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Approved', 'Approved')], default='Pending', max_length=50)),
                ('amount', models.FloatField()),
                ('description', models.CharField(max_length=50)),
                ('party', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='apis.party')),
                ('party_order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.partyorder')),
                ('sale_officer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.salesofficer')),
                ('sl', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='apis.salesofficer')),
            ],
        ),
        migrations.AddField(
            model_name='partyorder',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.product'),
        ),
        migrations.AddField(
            model_name='partyorder',
            name='sale_officer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.salesofficer'),
        ),
        migrations.AddField(
            model_name='category',
            name='products',
            field=models.ManyToManyField(to='apis.Product'),
        ),
        migrations.CreateModel(
            name='SalesOfficerLedger',
            fields=[
                ('ledger_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='apis.ledger')),
                ('qty', models.IntegerField(null=True)),
                ('rate', models.FloatField(null=True)),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='apis.category')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='apis.product')),
                ('sales_officer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.salesofficer')),
            ],
            bases=('apis.ledger',),
        ),
        migrations.AddField(
            model_name='partyorder',
            name='pl',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='apis.partyledger'),
        ),
        migrations.AddField(
            model_name='partyledger',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='apis.category'),
        ),
        migrations.AddField(
            model_name='partyledger',
            name='party',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.party'),
        ),
        migrations.AddField(
            model_name='partyledger',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='apis.product'),
        ),
        migrations.AddField(
            model_name='partyledger',
            name='sales_officer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.salesofficer'),
        ),
    ]