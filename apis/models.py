from django.db import models
from django.utils import timezone
from utils.utils import UpdateLeadgers,DeleteLeadgers
# Create your models here.
class SalesOfficer(models.Model):
    name = models.CharField(max_length=200,unique=True)
    commission = models.FloatField(default=0.0)
    contact = models.CharField(max_length=13)
    
    opening_Balance = models.FloatField()
    current_Balance = models.FloatField(blank=True, null=True)
    
    date = models.DateField(default=timezone.now, blank=True)

    def save(self, *args, **kwargs):
        if self.id == None:
            self.current_Balance = self.opening_Balance
        super(SalesOfficer, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    
  
class Party(models.Model):
    name = models.CharField(max_length=30, unique=True)
    contact = models.CharField(max_length=13)
    discount = models.FloatField()

    opening_Balance = models.FloatField()
    current_Balance = models.FloatField(blank=True, null=True)

    date = models.DateField(default=timezone.now, blank=True)

    def save(self, *args, **kwargs):
        if self.id == None:
            self.current_Balance = self.opening_Balance

        super(Party, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200,unique=True)
    default_price = models.FloatField(blank=True,default=0) 
    date = models.DateField(default=timezone.now, blank=True)
    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=300,unique=True)
    products = models.ManyToManyField(Product)
    date = models.DateField(default=timezone.now, blank=True)
    def __str__(self):
        return self.name 
    
class DiscountCategory(models.Model):
    name = models.CharField(max_length=50)
    discount = models.FloatField()

    def __str__(self):
        return self.name + ' : ' + str(self.discount)

    
    
# Ledgers
class Ledger(models.Model):
    date = models.DateField(default=timezone.now, blank=True)
    description = models.CharField(max_length=50, null=True)
    transaction_type = models.CharField(max_length=50, choices=(
        ('Debit', 'Debit'), ('Credit', 'Credit')))
    total_amount = models.FloatField(null=True)
    net_balance = models.FloatField(blank=True, default=0.0)

    def __str__(self):
        return str(self.id)
    
class PartyLedger(Ledger):
    party = models.ForeignKey(Party,on_delete=models.CASCADE)
    sales_officer = models.ForeignKey(SalesOfficer, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    qty = models.IntegerField(null=True)
    rate = models.FloatField(null=True)

    def __str__(self):
        return self.party.name + str(self.id)

    def save(self, *args, **kwargs):        
        if self.id == None:
            if self.transaction_type == 'Credit':
                self.party.current_Balance -= self.total_amount
                self.net_balance = self.party.current_Balance
            else:
                self.party.current_Balance += self.total_amount
                self.net_balance = self.party.current_Balance
            self.party.save()
            super(PartyLedger, self).save(*args, **kwargs)
        else:
            up = kwargs.pop('updating', {})
            obj = self
            if up == {}:
                obj = UpdateLeadgers(self, PartyLedger, 'Party', True)
                obj.qty = self.qty
                obj.rate = self.rate
                obj.category = self.category
                obj.product = self.product
                obj.total_amount = self.total_amount

            super(PartyLedger, obj).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        up = kwargs.pop('updating', {})
        if up == {}:
            DeleteLeadgers(self, PartyLedger, 'Party', True)
        else:
            super(PartyLedger, self).delete()

class SalesOfficerLedger(Ledger):
    sales_officer = models.ForeignKey(SalesOfficer, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    
    qty = models.IntegerField(null=True)
    rate = models.FloatField(null=True)


    def __str__(self):
        return self.sales_officer.name + str(self.id)

    def save(self, *args, **kwargs):        
        if self.id == None:
            if self.transaction_type == 'Credit':
                self.sales_officer.current_Balance -= self.total_amount
                self.net_balance = self.sales_officer.current_Balance
            else:
                self.sales_officer.current_Balance += self.total_amount
                self.net_balance = self.sales_officer.current_Balance
            self.sales_officer.save()

            super(SalesOfficerLedger, self).save(*args, **kwargs)
        else:
            up = kwargs.pop('updating', {})
            obj = self
            if up == {}:
                obj = UpdateLeadgers(self, SalesOfficerLedger, 'SalesOfficer', True)
                obj.qty = self.qty
                obj.rate = self.rate
                obj.category = self.category
                obj.product = self.product
                obj.description = self.description
                obj.total_amount = self.total_amount

            super(SalesOfficerLedger, obj).save(*args, **kwargs)
    
    def delete(self, *args, **kwargs):
        up = kwargs.pop('updating', {})
        if up == {}:
            DeleteLeadgers(self, PartyLedger, 'Party', True)
        else:
            super(PartyLedger, self).delete()

# UI
class PartyOrder(models.Model):
    date = models.DateField(default=timezone.now, blank=True)
    party = models.ForeignKey(Party,on_delete=models.CASCADE)
    sale_officer = models.ForeignKey(SalesOfficer,on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Approved','Approved')], default='Pending')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    description = models.CharField(max_length=50)
    discount = models.ForeignKey(DiscountCategory,on_delete=models.SET_NULL,null=True)

    qty = models.IntegerField()
    rate = models.IntegerField()
    total_amount = models.FloatField(null=True, blank=True)
    discounted_amount = models.FloatField(null=True, blank=True)


    pl = models.ForeignKey(PartyLedger,on_delete=models.CASCADE,null=True,blank=True, related_name='+')
    def __str__(self):
        return self.party.name + ' : ' + str(self.id)
    

    def save(self, *args, **kwargs):
        if self.id == None:
            if self.discount:
                total = (self.rate + self.qty)
                self.discounted_amount = total * (self.discount.discount/100)
                
            self.total_amount = self.qty * self.rate
        if self.status == 'Approved':
            pl = PartyLedger(party=self.party,sales_officer=self.sale_officer, 
                            category=self.category,product=self.product,
                            qty=self.qty, rate=self.rate, transaction_type='Debit',
                            description=self.description,
                            total_amount=(self.qty * self.rate))
            pl.save()
            self.pl = pl

        super(PartyOrder, self).save(*args, **kwargs)

class Recovery(models.Model):
    date = models.DateField(default=timezone.now, blank=True)
    party = models.ForeignKey(Party,on_delete=models.CASCADE,null=True,blank=True)
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Approved','Approved')], default='Pending')
    party_order = models.ForeignKey(PartyOrder,on_delete=models.CASCADE)
    sale_officer = models.ForeignKey(SalesOfficer,on_delete=models.CASCADE)
    amount = models.FloatField()
    description = models.CharField(max_length=50)

    sl = models.ForeignKey(SalesOfficerLedger,on_delete=models.CASCADE,null=True,blank=True, related_name='+')
    def __str__(self):
        return str(self.party_order.id) + ':' + self.sale_officer.name

    
    def save(self, *args, **kwargs):
        if self.status == 'Approved':
            sl = SalesOfficerLedger(sales_officer=self.sale_officer,transaction_type='Debit',
                              description=self.description,
                              total_amount=(self.amount))
            sl.save()
            self.sl = sl

        super(Recovery, self).save(*args, **kwargs)