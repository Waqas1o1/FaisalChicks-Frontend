from django.contrib import admin
from django.contrib.admin.decorators import register
from apis.models import *
# Register your models here.
admin.site.register((Party,SalesOfficer,Category,Product,DiscountCategory))
admin.site.register((SalesOfficerLedger,PartyLedger))
admin.site.register((PartyOrder,Recovery))