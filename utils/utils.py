from apis import models as m
from django.db.models import Q



def updateCurrentBalance(type,last):

    if type == 'Party':
        last.party.current_Balance = last.net_Balancse
        last.party.save()
    elif type == 'SalesOfficer':
        last.sales_officer.current_Balance = last.net_Balancse
        last.party.save()


def updateCurrentBalanceToOpeniing(type,last):
    if type == 'Party':
        last.party.current_Balance = last.party.opening_Balance
        last.party.save()
    elif type == 'SalesOfficer':
        last.sales_officer.current_Balance = last.sales_officer.opening_Balance
        last.party.save()
    

def GetReliventLeadger(type,l,obj):
    if type == 'Party':
        l =l.filter(party=obj.party)
    elif type == 'SalesOfficer':
        l =l.filter(sales_officer=obj.party)
    return l


def UpdateLeadgers(obj, leadger, type, isReverse=False):
    l = leadger.objects.all()

    l = GetReliventLeadger(type,l,obj)
    
    l = l.filter(id__gte=obj.id).order_by('id')
    
    try:
        obj.total_amount = obj.total_amount[0]
        diff = obj.total_amount - l.first().total_amount
    except TypeError:
        diff = obj.total_amount - l.first().total_amount
    
    last = obj

    for i in l:
        if obj.transaction_type == 'Credit':
            if isReverse:
                i.net_Balancse -= diff
            else:
                i.net_Balancse += diff

        else:
            if isReverse:
                i.net_Balancse += diff
            else:
                i.net_Balancse -= diff

        i.save(updating=True)
        if i == l.last():
            last = i
    
    updateCurrentBalance(type,last)

    return l.first()


def DeleteLeadgers(obj, leadger, type, isReverse=False):
    l = leadger.objects.all()
    
    l = GetReliventLeadger(type,l,obj)
    relvent_lg = l
    l = l.filter(id__gte=obj.id).order_by('id')

    last = obj
    
    # First
    if relvent_lg.count() == 1:
        print('in first ')
        updateCurrentBalanceToOpeniing(type,last) 
    # last
    elif obj == relvent_lg.last():
        print('in 2nd')
        lg = leadger.objects.get(id=obj.id)
        last = relvent_lg.filter(Q(id__lte=lg.id) and ~Q(id=lg.id)).last()
        updateCurrentBalance(type,last)
        print(last.id,last.total_amount)
    # Middle
    else:
        print('in 3rd')
        for i in l[1:]:
            if obj.transaction_type == 'Credit':
                if isReverse:
                    i.net_Balancse += obj.total_amount
                else:
                    i.net_Balancse -= obj.total_amount
                i.save(updating=True)
            else:
                if isReverse:
                    i.net_Balancse -= obj.total_amount
                else:
                    i.net_Balancse += obj.total_amount
                i.save(updating=True)

            if i == l.last():
                last = i
        updateCurrentBalance(type,last)
    
    
    obj.delete(updating=True)



