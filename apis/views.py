from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404, render
from rest_framework  import viewsets,generics,status
from rest_framework.response import Response
from apis import models as m
from apis import serializers as s
from apis import permisions as p
# Create your views here.
# Authentication

# CRUD oprations
class PartyViewSet(viewsets.ViewSet):
    def list(self, request):
        if request.user.is_superuser or p.SalesOfficer(request) or p.Accountant :
            data = m.Party.objects.all()
            serializer = s.PartySerializer(
                data, many=True, context={"request": request})
            response_dict = {
                "error": False, "message": "All List Data", "data": serializer.data}
        else:
            response_dict = {
                "error": False, "message": 'UnAuthenticated Person'}
        return Response(response_dict)

    def create(self, request):
        if request.user.is_superuser :
            try:
                serializer = s.PartySerializer(
                    data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                dict_response = {"error": False,
                                "message": "Data Save Successfully"}
            except ValueError as err:
                dict_response = {"error": True, "message": err}
            except:
                dict_response = {"error": True,
                                "message": "Error During Saving Data"}
        else:
            response_dict = {
                "error": False, "message": 'UnAuthenticated Person'}
        return JsonResponse(dict_response)

    def retrieve(self, request, pk=None):
        if request.user.is_superuser or p.SalesOfficer(request) or p.Accountant :
            queryset = m.Party.objects.all()
            query = get_object_or_404(queryset, pk=pk)
            serializer = s.PartySerializer(
                query, context={"request": request})
            serializer_data = serializer.data
        
            return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})
        else:
            response_dict = {
                "error": False, "message": 'UnAuthenticated Person'}
        return Response(response_dict)
    def update(self, request, pk=None):
        if request.user.is_superuser:
            try:
                queryset = m.Party.objects.all()
                query = get_object_or_404(queryset, pk=pk)
                serializer = s.PartySerializer(
                    query, data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                dict_response = {"error": False,
                                "message": "Successfully Updated Data"}
            except:
                dict_response = {"error": True,
                                "message": "Error During Updating Data"}

            return Response(dict_response)
        else:
            response_dict = {
                "error": False, "message": 'UnAuthenticated Person'}
        return Response(response_dict)

    def delete(self, request, pk=None):
        if request.user.is_superuser :
            try:
                m.Party.objects.get(id=pk).delete()
                response_dict = {"error": False,
                                "message": "Successfully Deleted"}
            except:
                response_dict = {"error": True,
                                "message": "Error During Deleted Data "}
        else:
            response_dict = {
                "error": False, "message": 'UnAuthenticated Person'}
        return Response(response_dict)

class SalesOfficerViewSet(viewsets.ViewSet):

    def list(self, request):
        if request.user.is_superuser or p.Accountant(request):
            data = m.SalesOfficer.objects.all()
            serializer = s.SalesOfficerSerializer(
                data, many=True, context={"request": request})
            response_dict = {
                "error": False, "message": "All List Data", "data": serializer.data}
            return Response(response_dict)
        else:
            response_dict = {
                "error": False, "message": 'UnAuthenticated Person'}
        return Response(response_dict)
    def create(self, request):
        if request.user.is_superuser :
            try:
                serializer = s.SalesOfficerSerializer(
                    data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                response_dict = {"error": False,
                                "message": "Data Save Successfully"}
            except ValueError as err:
                response_dict = {"error": True, "message": err}
            except:
                response_dict = {"error": True,
                                "message": "Error During Saving Data"}
        else:
            response_dict = {
                "error": False, "message": 'UnAuthenticated Person'}
        return JsonResponse(response_dict)

    def retrieve(self, request, pk=None):
        if request.user.is_superuser or p.Accountant(request):
            queryset = m.SalesOfficer.objects.all()
            query = get_object_or_404(queryset, pk=pk)
            serializer = s.SalesOfficerSerializer(
                query, context={"request": request})
            serializer_data = serializer.data
            return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})
        else:
            response_dict = {
                "error": False, "message": 'UnAuthenticated Person'}
        return JsonResponse(response_dict)

    def update(self, request, pk=None):
        if request.user.is_superuser:
            try:
                queryset = m.SalesOfficer.objects.all()
                query = get_object_or_404(queryset, pk=pk)
                serializer = s.SalesOfficerSerializer(
                    query, data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                response_dict = {"error": False,
                                "message": "Successfully Updated Data"}
            except:
                response_dict = {"error": True,
                                "message": "Error During Updating Data"}
        else:
            response_dict = {
                "error": False, "message": 'UnAuthenticated Person'}
        return JsonResponse(response_dict)

    def delete(self, request, pk=None):
        if request.user.is_superuser:
            try:
                m.SalesOfficer.objects.get(id=pk).delete()
                response_dict = {"error": False,
                                "message": "Successfully Deleted"}
            except:
                response_dict = {"error": True,
                                "message": "Error During Deleted Data "}
        else:
            response_dict = {"error": True,
                                "message": "Error During Updating Data"}
        return Response(response_dict)

class BankViewSet(viewsets.ViewSet):
    def list(self, request):
        if request.user.is_superuser or p.SalesOfficer(request) or p.Accountant :
            data = m.Bank.objects.all()
            serializer = s.BankSerializer(
                data, many=True, context={"request": request})
            response_dict = {
                "error": False, "message": "All List Data", "data": serializer.data}
        else:
            response_dict = {
                "error": False, "message": 'UnAuthenticated Person'}
        return Response(response_dict)

    def create(self, request):
        if request.user.is_superuser :
            try:
                serializer = s.BankSerializer(
                    data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                dict_response = {"error": False,
                                "message": "Data Save Successfully"}
            except ValueError as err:
                dict_response = {"error": True, "message": err}
            except:
                dict_response = {"error": True,
                                "message": "Error During Saving Data"}
        else:
            response_dict = {
                "error": False, "message": 'UnAuthenticated Person'}
        return JsonResponse(dict_response)

    def retrieve(self, request, pk=None):
        if request.user.is_superuser or p.SalesOfficer(request) or p.Accountant :
            queryset = m.Bank.objects.all()
            query = get_object_or_404(queryset, pk=pk)
            serializer = s.BankSerializer(
                query, context={"request": request})
            serializer_data = serializer.data
        
            return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})
        else:
            response_dict = {
                "error": False, "message": 'UnAuthenticated Person'}
        return Response(response_dict)
    def update(self, request, pk=None):
        if request.user.is_superuser:
            try:
                queryset = m.Bank.objects.all()
                query = get_object_or_404(queryset, pk=pk)
                serializer = s.BankSerializer(
                    query, data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                dict_response = {"error": False,
                                "message": "Successfully Updated Data"}
            except:
                dict_response = {"error": True,
                                "message": "Error During Updating Data"}

            return Response(dict_response)
        else:
            response_dict = {
                "error": False, "message": 'UnAuthenticated Person'}
        return Response(response_dict)

    def delete(self, request, pk=None):
        if request.user.is_superuser :
            try:
                m.Bank.objects.get(id=pk).delete()
                response_dict = {"error": False,
                                "message": "Successfully Deleted"}
            except:
                response_dict = {"error": True,
                                "message": "Error During Deleted Data "}
        else:
            response_dict = {
                "error": False, "message": 'UnAuthenticated Person'}
        return Response(response_dict)


class CategoryViewSet(viewsets.ViewSet):

    def list(self, request):
        if request.user.is_superuser or p.SalesOfficer(request) or p.Accountant(request):
            data = m.Category.objects.all()
            serializer = s.CategorySerializer(
                data, many=True, context={"request": request})
            response_dict = {
                "error": False, "message": "All List Data", "data": serializer.data}
            return Response(response_dict)
        
    def create(self, request):
        if request.user.is_superuser :
            try:
                serializer = s.CategorySerializer(
                    data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                dict_response = {"error": False,
                                "message": "Data Save Successfully"}
            except ValueError as err:
                dict_response = {"error": True, "message": err}
            except:
                dict_response = {"error": True,
                                "message": "Error During Saving Data"}

        return JsonResponse(dict_response)

    def retrieve(self, request, pk=None):
        if request.user.is_superuser or p.SalesOfficer(request) or p.Accountant(request):
            queryset = m.Category.objects.all()
            query = get_object_or_404(queryset, pk=pk)
            serializer = s.CategorySerializer(
                query, context={"request": request})
            serializer_data = serializer.data
            return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})

    def update(self, request, pk=None):
        if request.user.is_superuser :
            try:
                queryset = m.Category.objects.all()
                query = get_object_or_404(queryset, pk=pk)
                serializer = s.CategorySerializer(
                    query, data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                dict_response = {"error": False,
                                "message": "Successfully Updated Data"}
            except:
                dict_response = {"error": True,
                                "message": "Error During Updating Data"}

        return Response(dict_response)

    def delete(self, request, pk=None):
        if request.user.is_superuser:
            try:
                m.Category.objects.get(id=pk).delete()
                dict_response = {"error": False,
                                "message": "Successfully Deleted"}
            except:
                dict_response = {"error": True,
                                "message": "Error During Deleted Data "}

        return Response(dict_response)

class ProductViewSet(viewsets.ViewSet):
    def list(self, request):
        if request.user.is_superuser or p.SalesOfficer(request) or p.Accountant(request):
            data = m.Product.objects.all()
            serializer = s.ProductSerializer(
                data, many=True, context={"request": request})
            response_dict = {
                "error": False, "message": "All List Data", "data": serializer.data}
            return Response(response_dict)

    def create(self, request):
        if request.user.is_superuser :
            try:
                serializer = s.ProductSerializer(
                    data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                dict_response = {"error": False,
                                "message": "Data Save Successfully"}
            except ValueError as err:
                dict_response = {"error": True, "message": err}
            except:
                dict_response = {"error": True,
                                "message": "Error During Saving Data"}

        return JsonResponse(dict_response)

    def retrieve(self, request, pk=None):
        if request.user.is_superuser or p.SalesOfficer(request) or p.Accountant(request):
            queryset = m.Product.objects.all()
            query = get_object_or_404(queryset, pk=pk)
            serializer = s.ProductSerializer(
                query, context={"request": request})
            serializer_data = serializer.data
            return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})

    def update(self, request, pk=None):
        if request.user.is_superuser:
            try:
                queryset = m.Product.objects.all()
                query = get_object_or_404(queryset, pk=pk)
                serializer = s.ProductSerializer(
                    query, data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                dict_response = {"error": False,
                                "message": "Successfully Updated Data"}
            except:
                dict_response = {"error": True,
                                "message": "Error During Updating Data"}

            return Response(dict_response)

    def delete(self, request, pk=None):
        if request.user.is_superuser :
            try:
                m.Product.objects.get(id=pk).delete()
                dict_response = {"error": False,
                                "message": "Successfully Deleted"}
            except:
                dict_response = {"error": True,
                                "message": "Error During Deleted Data "}
            return Response(dict_response)

class DiscountCategoryViewSet(viewsets.ViewSet):

    def list(self, request):
        if request.user.is_superuser or p.SalesOfficer(request) or p.Accountant(request):
            data = m.DiscountCategory.objects.all()
            serializer = s.DiscountCategorySerializer(
                data, many=True, context={"request": request})
            response_dict = {
                "error": False, "message": "All List Data", "data": serializer.data}
            return Response(response_dict)

    def create(self, request):
        if request.user.is_superuser:
            try:
                serializer = s.DiscountCategorySerializer(
                    data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                dict_response = {"error": False,
                                "message": "Data Save Successfully"}
            except ValueError as err:
                dict_response = {"error": True, "message": err}
            except:
                dict_response = {"error": True,
                                "message": "Error During Saving Data"}

            return JsonResponse(dict_response)

    def retrieve(self, request, pk=None):
        if request.user.is_superuser or p.SalesOfficer(request) or p.Accountant(request):
            queryset = m.DiscountCategory.objects.all()
            query = get_object_or_404(queryset, pk=pk)
            serializer = s.DiscountCategorySerializer(
                query, context={"request": request})
            serializer_data = serializer.data
            return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})

    def update(self, request, pk=None):
        if request.user.is_superuser:
            try:
                queryset = m.DiscountCategory.objects.all()
                query = get_object_or_404(queryset, pk=pk)
                serializer = s.DiscountCategorySerializer(
                    query, data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                dict_response = {"error": False,
                                "message": "Successfully Updated Data"}
            except:
                dict_response = {"error": True,
                                "message": "Error During Updating Data"}

        return Response(dict_response)

    def delete(self, request, pk=None):
        if request.user.is_superuser:
            try:
                m.DiscountCategory.objects.get(id=pk).delete()
                dict_response = {"error": False,
                                "message": "Successfully Deleted"}
            except:
                dict_response = {"error": True,
                                "message": "Error During Deleted Data "}

            return Response(dict_response)

class PartyOrderViewSet(viewsets.ViewSet):

    def list(self, request):
        if request.user.is_superuser or p.SalesOfficer(request) or p.Accountant(request):
            data = m.PartyOrder.objects.all()
            serializer = s.PartyOrderSerializer(
                data, many=True, context={"request": request})
            response_dict = {
                "error": False, "message": "All List Data", "data": serializer.data}
            return Response(response_dict)

    def create(self, request):
        if request.user.is_superuser or p.SalesOfficer(request):
            try:
                serializer = s.PartyOrderSerializer(
                    data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                dict_response = {"error": False,
                                "message": "Data Save Successfully"}
            except ValueError as err:
                dict_response = {"error": True, "message": err}
            except:
                dict_response = {"error": True,
                                "message": "Error During Saving Data"}

        return JsonResponse(dict_response)

    def retrieve(self, request, pk=None):
        if request.user.is_superuser or p.SalesOfficer(request) or p.Accountant(request):
            queryset = m.PartyOrder.objects.all()
            query = get_object_or_404(queryset, pk=pk)
            serializer = s.PartyOrderSerializer(
                query, context={"request": request})
            serializer_data = serializer.data
            return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})

    def update(self, request, pk=None):
        if request.user.is_superuser or p.SalesOfficer(request):
            try:
                queryset = m.PartyOrder.objects.all()
                query = get_object_or_404(queryset, pk=pk)
                serializer = s.PartyOrderSerializer(
                    query, data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                dict_response = {"error": False,
                                "message": "Successfully Updated Data"}
            except:
                dict_response = {"error": True,
                                "message": "Error During Updating Data"}

            return Response(dict_response)

    def delete(self, request, pk=None):
        if request.user.is_superuser or p.SalesOfficer(request):
            try:
                m.PartyOrder.objects.get(id=pk).delete()
                dict_response = {"error": False,
                                "message": "Successfully Deleted"}
            except:
                dict_response = {"error": True,
                                "message": "Error During Deleted Data "}

            return Response(dict_response)

class RecoveryViewSet(viewsets.ViewSet):

    def list(self, request):
        if request.user.is_superuser or p.SalesOfficer(request) or p.Accountant(request):
            data = m.Recovery.objects.all()
            serializer = s.RecoverySerializer(
                data, many=True, context={"request": request})
            response_dict = {
                "error": False, "message": "All List Data", "data": serializer.data}
            return Response(response_dict)

    def create(self, request):
        if request.user.is_superuser or p.SalesOfficer(request):
            try:
                serializer = s.RecoverySerializer(
                    data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                dict_response = {"error": False,
                                "message": "Data Save Successfully"}
            except ValueError as err:
                dict_response = {"error": True, "message": err}
            except:
                dict_response = {"error": True,
                                "message": "Error During Saving Data"}

        return JsonResponse(dict_response)

    def retrieve(self, request, pk=None):
        if request.user.is_superuser or p.SalesOfficer(request) or p.Accountant(request):
            queryset = m.Recovery.objects.all()
            query = get_object_or_404(queryset, pk=pk)
            serializer = s.RecoverySerializer(
                query, context={"request": request})
            serializer_data = serializer.data
            return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})

    def update(self, request, pk=None):
        if request.user.is_superuser or p.SalesOfficer(request) or p.Accountant(request):
            try:
                queryset = m.Recovery.objects.all()
                query = get_object_or_404(queryset, pk=pk)
                serializer = s.RecoverySerializer(
                    query, data=request.data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                dict_response = {"error": False,
                                "message": "Successfully Updated Data"}
            except:
                dict_response = {"error": True,
                                "message": "Error During Updating Data"}

            return Response(dict_response)

    def delete(self, request, pk=None):
        if request.user.is_superuser or p.SalesOfficer(request) :
            try:
                m.Recovery.objects.get(id=pk).delete()
                dict_response = {"error": False,
                                "message": "Successfully Deleted"}
            except:
                dict_response = {"error": True,
                                "message": "Error During Deleted Data "}

            return Response(dict_response)

# Change Status

def ChangePartyOrderStatus(request,id):
    if request.user.is_superuser or p.Accountant(request):
        try:
            pt = m.PartyOrder.objects.get(id=id)
            pt.status = 'Approved'
            pt.save()
            return JsonResponse({'error':False,'data':'Successfuly Updated'})
        except:
            return JsonResponse({'error':True,'data':'Something went"s wrong'})
    
def RecoveryStatusChange(request,id):
    if request.user.is_superuser or p.Accountant(request):
        try:
            r = m.Recovery.objects.get(id=id)
            r.status = 'Approved'
            r.save()
            return JsonResponse({'error':False,'data':'Successfuly Updated'})
        except:
            return JsonResponse({'error':True,'data':'Something went"s wrong'})

# Ledger View
class PartyLedgerFilter(generics.ListAPIView):
    
    serializer_class = s.PartyLedgerSerializer

    def get_queryset(self):
        f_date = self.kwargs['FromDate']
        t_date = self.kwargs['ToDate']
        party = self.kwargs['party']
        return m.PartyLedger.objects.filter(party=party, date__lte=t_date, date__gte=f_date)

class SalesOfficerLedgerFilter(generics.ListAPIView):
    serializer_class = s.SalesOfficerLedgerSerializer

    def get_queryset(self):
        f_date = self.kwargs['FromDate']
        t_date = self.kwargs['ToDate']
        sales_officer = self.kwargs['sales_officer']
        return m.SalesOfficer.objects.filter(sales_officer=sales_officer, date__lte=t_date, date__gte=f_date)

class SalesLedgerFilter(generics.ListAPIView):
    serializer_class = s.SalesLedgerSerializer

    def get_queryset(self):
        f_date = self.kwargs['FromDate']
        t_date = self.kwargs['ToDate']
        sales_person = self.kwargs['sales_person']
        return m.SalesLedger.objects.filter(sales_person=sales_person, date__lte=t_date, date__gte=f_date)

class FreightLedgerFilter(generics.ListAPIView):
    serializer_class = s.FreightLedgerSerializer

    def get_queryset(self):
        f_date = self.kwargs['FromDate']
        t_date = self.kwargs['ToDate']
        freight_person = self.kwargs['freight_person']
        return m.FreightLedger.objects.filter(freight_person=freight_person, date__lte=t_date, date__gte=f_date)

class DiscountLedgerFilter(generics.ListAPIView):
    serializer_class = s.DiscountLedgerSerializer

    def get_queryset(self):
        f_date = self.kwargs['FromDate']
        t_date = self.kwargs['ToDate']
        discount_person = self.kwargs['discount_person']
        return m.DiscountLedger.objects.filter(discount_person=discount_person, date__lte=t_date, date__gte=f_date)

class BankLedgerFilter(generics.ListAPIView):
    serializer_class = s.BankLedgerSerializer

    def get_queryset(self):
        f_date = self.kwargs['FromDate']
        t_date = self.kwargs['ToDate']
        Bank_person = self.kwargs['Bank_person']
        return m.BankLedger.objects.filter(Bank_person=Bank_person, date__lte=t_date, date__gte=f_date)

class DiscountLedgerFilter(generics.ListAPIView):
    serializer_class = s.DiscountLedgerSerializer

    def get_queryset(self):
        f_date = self.kwargs['FromDate']
        t_date = self.kwargs['ToDate']
        discount_person = self.kwargs['discount_person']
        return m.DiscountLedger.objects.filter(discount_person=discount_person, date__lte=t_date, date__gte=f_date)

class DiscountLedgerFilter(generics.ListAPIView):
    serializer_class = s.DiscountLedgerSerializer

    def get_queryset(self):
        f_date = self.kwargs['FromDate']
        t_date = self.kwargs['ToDate']
        discount_person = self.kwargs['discount_person']
        return m.DiscountLedger.objects.filter(discount_person=discount_person, date__lte=t_date, date__gte=f_date)

# Test

def Test(request):
    party = m.PartyLedger.objects.all()
    salesofficer = m.SalesOfficerLedger.objects.all()
    sales = m.SalesLedger.objects.all()
    bank = m.BankLedger.objects.all()
    freight = m.FreightLedger.objects.all()
    discount = m.DiscountLedger.objects.all()
    cleariing = m.ClearingLedger.objects.all()
    cash = m.CashLedger.objects.all()
    response_dict = {'Party':party,'SalesOfficer':salesofficer,'Sales':sales,'Bank':bank,'Freight':freight
                    ,'Discount':discount,'Cash':cash,'Clearing':cleariing }
    return render(request,'test.html',response_dict)