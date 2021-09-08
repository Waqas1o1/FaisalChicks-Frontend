from django.db import models
from django.utils import timezone
from utils.utils import UpdateLeadgers,DeleteLeadgers
# Users

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


class Bank(models.Model):
    name = models.CharField(max_length=30, unique=True)
    account_no = models.CharField(max_length=400)
    opening_Balance = models.FloatField()
    current_Balance = models.FloatField(blank=True, null=True)

    date = models.DateField(default=timezone.now, blank=True)

    def save(self, *args, **kwargs):
        if self.id == None:
            self.current_Balance = self.opening_Balance

        super(Bank, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

  
class SalesPerson(models.Model):
    name = models.CharField(max_length=30, unique=True)

    opening_Balance = models.FloatField()
    current_Balance = models.FloatField(blank=True, null=True)

    date = models.DateField(default=timezone.now, blank=True)

    def save(self, *args, **kwargs):
        if self.id == None:
            self.current_Balance = self.opening_Balance
        super(SalesPerson, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
 
class DiscountPerson(models.Model):
    name = models.CharField(max_length=30, unique=True)

    opening_Balance = models.FloatField()
    current_Balance = models.FloatField(blank=True, null=True)

    date = models.DateField(default=timezone.now, blank=True)

    def save(self, *args, **kwargs):
        if self.id == None:
            self.current_Balance = self.opening_Balance

        super(DiscountPerson, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
 
class FreightPerson(models.Model):
    name = models.CharField(max_length=30, unique=True)
    opening_Balance = models.FloatField()
    current_Balance = models.FloatField(blank=True, null=True)

    date = models.DateField(default=timezone.now, blank=True)

    def save(self, *args, **kwargs):
        if self.id == None:
            self.current_Balance = self.opening_Balance

        super(FreightPerson, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

class CashPerson(models.Model):
    name = models.CharField(max_length=30, unique=True)
    # Opening
    opening_Balance = models.FloatField()
    current_Balance = models.FloatField(blank=True, null=True)

    date = models.DateField(default=timezone.now, blank=True)

    def save(self, *args, **kwargs):
        if self.id == None:
            self.current_Balance = self.opening_Balance

        super(CashPerson, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    
class OnlinePerson(models.Model):
    name = models.CharField(max_length=30, unique=True)
    # Opening
    opening_Balance = models.FloatField()
    current_Balance = models.FloatField(blank=True, null=True)

    date = models.DateField(default=timezone.now, blank=True)

    def save(self, *args, **kwargs):
        if self.id == None:
            self.current_Balance = self.opening_Balance

        super(OnlinePerson, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    
class ClearingPerson(models.Model):
    name = models.CharField(max_length=30, unique=True)
    # Opening
    opening_Balance = models.FloatField()
    current_Balance = models.FloatField(blank=True, null=True)

    date = models.DateField(default=timezone.now, blank=True)

    def save(self, *args, **kwargs):
        if self.id == None:
            self.current_Balance = self.opening_Balance

        super(ClearingPerson, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
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
    freight = models.FloatField(blank=True,null=True)
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

class BankLedger(Ledger):
    bank_person = models.ForeignKey(Bank,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.sales_person 

    def save(self, *args, **kwargs):        
        if self.id == None:
            if self.transaction_type == 'Credit':
                self.bank_person.current_Balance -= self.total_amount
                self.net_balance = self.bank_person.current_Balance
            else:
                self.bank_person.current_Balance += self.total_amount
                self.net_balance = self.bank_person.current_Balance
            self.bank_person.save()
            super(BankLedger, self).save(*args, **kwargs)
        else:
            up = kwargs.pop('updating', {})
            obj = self
            if up == {}:
                obj = UpdateLeadgers(self, BankLedger, 'Bank', True)
                obj.total_amount = self.total_amount

            super(BankLedger, obj).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        up = kwargs.pop('updating', {})
        if up == {}:
            DeleteLeadgers(self, DiscountLedger, 'Bank', True)
        else:
            super(DiscountLedger, self).delete()   

class SalesLedger(Ledger):
    sales_person = models.ForeignKey(SalesPerson,on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)

    qty = models.IntegerField(null=True)
    rate = models.FloatField(null=True)
    def __str__(self):
        return self.sales_person.name 
    
    def save(self, *args, **kwargs):        
        if self.id == None:
            self.sales_person = SalesPerson.objects.first()
            if self.transaction_type == 'Credit':
                self.sales_person.current_Balance -= self.total_amount
                self.net_balance = self.sales_person.current_Balance
            else:
                self.sales_person.current_Balance += self.total_amount
                self.net_balance = self.sales_person.current_Balance
            self.sales_person.save()
            super(SalesLedger, self).save(*args, **kwargs)
        else:
            up = kwargs.pop('updating', {})
            obj = self
            if up == {}:
                obj = UpdateLeadgers(self, SalesLedger, 'Sales', True)
                obj.qty = self.qty
                obj.rate = self.rate
                obj.category = self.category
                obj.product = self.product
                obj.total_amount = self.total_amount

            super(SalesLedger, obj).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        up = kwargs.pop('updating', {})
        if up == {}:
            DeleteLeadgers(self, SalesLedger, 'Sales', True)
        else:
            super(SalesLedger, self).delete()

class FreightLedger(Ledger):
    freight_person = models.ForeignKey(FreightPerson,on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    qty = models.IntegerField(null=True)
    rate = models.FloatField(null=True)
    def __str__(self):
        return self.freight_person.name   
    
    def save(self, *args, **kwargs):        
        if self.id == None:
            self.freight_person = FreightPerson.objects.first()
            if self.transaction_type == 'Credit':
                self.freight_person.current_Balance -= self.total_amount
                self.net_balance = self.freight_person.current_Balance
            else:
                self.freight_person.current_Balance += self.total_amount
                self.net_balance = self.freight_person.current_Balance
            self.freight_person.save()
            super(FreightLedger, self).save(*args, **kwargs)
        else:
            up = kwargs.pop('updating', {})
            obj = self
            if up == {}:
                obj = UpdateLeadgers(self, FreightLedger, 'Freight', True)
                obj.qty = self.qty
                obj.rate = self.rate
                obj.category = self.category
                obj.product = self.product
                obj.total_amount = self.total_amount

            super(FreightLedger, obj).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        up = kwargs.pop('updating', {})
        if up == {}:
            DeleteLeadgers(self, FreightLedger, 'Freight', True)
        else:
            super(FreightLedger, self).delete()

class DiscountLedger(Ledger):
    discount_person = models.ForeignKey(DiscountPerson,on_delete=models.CASCADE)
    discounted_amount = models.FloatField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    qty = models.IntegerField(null=True)
    rate = models.FloatField(null=True)
    
    def __str__(self):
        return self.discount_person.name 

    def save(self, *args, **kwargs):        
        if self.id == None:
            self.discount_person = DiscountPerson.objects.first()
            if self.transaction_type == 'Credit':
                self.discount_person.current_Balance -= self.total_amount
                self.net_balance = self.discount_person.current_Balance
            else:
                self.discount_person.current_Balance += self.total_amount
                self.net_balance = self.discount_person.current_Balance
            self.discount_person.save()
            super(DiscountLedger, self).save(*args, **kwargs)
        else:
            up = kwargs.pop('updating', {})
            obj = self
            if up == {}:
                obj = UpdateLeadgers(self, DiscountLedger, 'Discount', True)
                obj.qty = self.qty
                obj.rate = self.rate
                obj.category = self.category
                obj.product = self.product
                obj.total_amount = self.total_amount

            super(DiscountLedger, obj).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        up = kwargs.pop('updating', {})
        if up == {}:
            DeleteLeadgers(self, DiscountLedger, 'Discount', True)
        else:
            super(DiscountLedger, self).delete()   

class CashLedger(Ledger):
    cash_person = models.ForeignKey(CashPerson,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.cash_person.name 

    def save(self, *args, **kwargs):        
        if self.id == None:
            self.cash_person = CashPerson.objects.first()
            if self.transaction_type == 'Credit':
                self.Cash_person.current_Balance -= self.total_amount
                self.net_balance = self.cash_person.current_Balance
            else:
                self.cash_person.current_Balance += self.total_amount
                self.net_balance = self.cash_person.current_Balance
            self.cash_person.save()
            super(CashLedger, self).save(*args, **kwargs)
        else:
            up = kwargs.pop('updating', {})
            obj = self
            if up == {}:
                obj = UpdateLeadgers(self, CashLedger, 'Cash', True)
                obj.total_amount = self.total_amount

            super(CashLedger, obj).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        up = kwargs.pop('updating', {})
        if up == {}:
            DeleteLeadgers(self, CashLedger, 'Cash', True)
        else:
            super(CashLedger, self).delete()   

class ClearingLedger(Ledger):
    clearing_person = models.ForeignKey(ClearingPerson,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.clearing_person.name 

    def save(self, *args, **kwargs):        
        if self.id == None:
            self.clearing_person = ClearingPerson.objects.first()
            if self.transaction_type == 'Credit':
                self.clearing_person.current_Balance -= self.total_amount
                self.net_balance = self.clearing_person.current_Balance
            else:
                self.clearing_person.current_Balance += self.total_amount
                self.net_balance = self.clearing_person.current_Balance
            self.clearing_person.save()
            super(ClearingLedger, self).save(*args, **kwargs)
        else:
            up = kwargs.pop('updating', {})
            obj = self
            if up == {}:
                obj = UpdateLeadgers(self, ClearingLedger, 'Clearing', True)
                obj.total_amount = self.total_amount

            super(ClearingLedger, obj).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        up = kwargs.pop('updating', {})
        if up == {}:
            DeleteLeadgers(self, ClearingLedger, 'Clearing', True)
        else:
            super(ClearingLedger, self).delete()   


# UI
class PartyOrder(models.Model):
    date = models.DateField(default=timezone.now, blank=True)
    party = models.ForeignKey(Party,on_delete=models.CASCADE)
    sale_officer = models.ForeignKey(SalesOfficer,on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Approved','Approved')], default='Pending')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    description = models.CharField(max_length=50)
    freight = models.FloatField(default=0)
    discount = models.ForeignKey(DiscountCategory,on_delete=models.SET_NULL,null=True)
    qty = models.IntegerField()
    rate = models.IntegerField()
    
    total_amount = models.FloatField(null=True, blank=True)
    discounted_amount = models.FloatField(null=True, blank=True)


    pl = models.ForeignKey(PartyLedger,on_delete=models.CASCADE,null=True,blank=True, related_name='+')
    sl = models.ForeignKey(SalesLedger,on_delete=models.CASCADE,null=True,blank=True, related_name='+')
    fl = models.ForeignKey(FreightLedger,on_delete=models.CASCADE,null=True,blank=True, related_name='+')
    dl = models.ForeignKey(DiscountLedger,on_delete=models.CASCADE,null=True,blank=True, related_name='+')
    
    def __str__(self):
        return self.party.name + ' : ' + str(self.id)
    

    def save(self, *args, **kwargs):
        if self.id == None:
            if self.discount:
                total = (self.rate + self.qty)
                self.discounted_amount = total * (self.discount.discount/100)
                
            self.total_amount = self.qty * self.rate
            # If Approved
            if self.status == 'Approved':
                pl = PartyLedger(party=self.party,sales_officer=self.sale_officer, 
                                category=self.category,product=self.product,
                                freight = self.freight,
                                qty=self.qty, rate=self.rate, transaction_type='Debit',
                                description=self.description,
                                total_amount=(self.qty * self.rate))
                pl.save()
                self.pl = pl
                sl = SalesLedger(total_amount=self.qty*self.rate,transaction_type='Credit',qty=self.qty,rate=self.rate,
                                category=self.category,product=self.product)

                sl.save()
                self.sl = sl
                fl = FreightLedger(total_amount=self.qty*self.rate,transaction_type='Credit',qty=self.qty,rate=self.rate,
                                    category=self.category,product=self.product)
                fl.save()
                self.fl = fl

                dl = DiscountLedger(total_amount=self.qty*self.rate,transaction_type='Credit',qty=self.qty,rate=self.rate,
                                category=self.category,product=self.product,discounted_amount=self.discounted_amount)
                dl.save()
                self.dl = dl
            super(PartyOrder, self).save(*args, **kwargs)
            
        else:
            if self.status == 'Approved':
                pass
            else:
                super(PartyOrder, self).save(*args, **kwargs)


class Recovery(models.Model):
    date = models.DateField(default=timezone.now, blank=True)
    party = models.ForeignKey(Party,on_delete=models.CASCADE,null=True,blank=True)
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Approved','Approved')], default='Pending')
    party_order = models.ForeignKey(PartyOrder,on_delete=models.CASCADE)
    sale_officer = models.ForeignKey(SalesOfficer,on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=20,choices=(('Cash','Cash'),('Bank','Bank'),('Clearing','Clearing'))) 
    bank = models.ForeignKey(Bank,on_delete=models.CASCADE,null=True,blank=True)
    amount = models.FloatField()
    description = models.CharField(max_length=50)

    sl = models.ForeignKey(SalesOfficerLedger,on_delete=models.CASCADE,null=True,blank=True)
    bl = models.ForeignKey(BankLedger,on_delete=models.CASCADE,null=True,blank=True)
    cl = models.ForeignKey(CashLedger,on_delete=models.CASCADE,null=True,blank=True)
    cll = models.ForeignKey(ClearingLedger,on_delete=models.CASCADE,null=True,blank=True)

    def __str__(self):
        return str(self.party_order.id) + ':' + self.sale_officer.name

    
    def save(self, *args, **kwargs):
        if self.id == None:
            if self.status == 'Approved':
                if self.party_order:
                    sl = SalesOfficerLedger(sales_officer=self.sale_officer,transaction_type='Debit',
                                    description = self.description,
                                    qty = self.party_order.qty,
                                    rate = self.party_order.rate,
                                    total_amount = (self.amount))
                else:
                    sl = SalesOfficerLedger(sales_officer=self.sale_officer,transaction_type='Debit',
                                    description = self.description,
                                    total_amount = (self.amount))
                sl.save()
                self.sl = sl
                if self.payment_method == 'Bank':
                    bl = BankLedger(bank=self.bank,transaction_type='Credit',
                                description=self.description,
                                total_amount=(self.amount))
                    bl.save()
                    self.bl = bl
                elif self.payment_method == 'Cash':
                    cl = CashLedger(transaction_type='Debit',
                                description=self.description,
                                total_amount=(self.amount))
                    cl.save()
                    self.cl = cl
                elif self.payment_method == 'Clearing':
                    ccl = ClearingLedger(transaction_type='Debit',
                                description=self.description,
                                total_amount=(self.amount))
                    ccl.save()
                    self.cll = ccl
            super(Recovery, self).save(*args, **kwargs)
        else:
            if self.status == 'Approved':
              pass
            else:
                super(Recovery, self).save(*args, **kwargs)        

        

