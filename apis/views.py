from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from rest_framework  import viewsets,generics
from rest_framework.response import Response
from apis import models as m
from apis import serializers as s
# Create your views here.

# CRUD oprations
class PartyViewSet(viewsets.ViewSet):

    def list(self, request):
        data = m.Party.objects.all()
        serializer = s.PartySerializer(
            data, many=True, context={"request": request})
        response_dict = {
            "error": False, "message": "All List Data", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
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

        return JsonResponse(dict_response)

    def retrieve(self, request, pk=None):
        queryset = m.Party.objects.all()
        query = get_object_or_404(queryset, pk=pk)
        serializer = s.PartySerializer(
            query, context={"request": request})
        serializer_data = serializer.data
        return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})

    def update(self, request, pk=None):
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

    def delete(self, request, pk=None):
        try:
            m.Party.objects.get(id=pk).delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted"}
        except:
            dict_response = {"error": True,
                             "message": "Error During Deleted Data "}

        return Response(dict_response)

class SalesOfficerViewSet(viewsets.ViewSet):

    def list(self, request):
        data = m.SalesOfficer.objects.all()
        serializer = s.SalesOfficerSerializer(
            data, many=True, context={"request": request})
        response_dict = {
            "error": False, "message": "All List Data", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
        try:
            serializer = s.SalesOfficerSerializer(
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
        queryset = m.SalesOfficer.objects.all()
        query = get_object_or_404(queryset, pk=pk)
        serializer = s.SalesOfficerSerializer(
            query, context={"request": request})
        serializer_data = serializer.data
        return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})

    def update(self, request, pk=None):
        try:
            queryset = m.SalesOfficer.objects.all()
            query = get_object_or_404(queryset, pk=pk)
            serializer = s.SalesOfficerSerializer(
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
        try:
            m.SalesOfficer.objects.get(id=pk).delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted"}
        except:
            dict_response = {"error": True,
                             "message": "Error During Deleted Data "}

        return Response(dict_response)

class CategoryViewSet(viewsets.ViewSet):

    def list(self, request):
        data = m.Category.objects.all()
        serializer = s.CategorySerializer(
            data, many=True, context={"request": request})
        response_dict = {
            "error": False, "message": "All List Data", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
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
        queryset = m.Category.objects.all()
        query = get_object_or_404(queryset, pk=pk)
        serializer = s.CategorySerializer(
            query, context={"request": request})
        serializer_data = serializer.data
        return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})

    def update(self, request, pk=None):
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
        data = m.Product.objects.all()
        serializer = s.ProductSerializer(
            data, many=True, context={"request": request})
        response_dict = {
            "error": False, "message": "All List Data", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
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
        queryset = m.Product.objects.all()
        query = get_object_or_404(queryset, pk=pk)
        serializer = s.ProductSerializer(
            query, context={"request": request})
        serializer_data = serializer.data
        return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})

    def update(self, request, pk=None):
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
        data = m.DiscountCategory.objects.all()
        serializer = s.DiscountCategorySerializer(
            data, many=True, context={"request": request})
        response_dict = {
            "error": False, "message": "All List Data", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
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
        queryset = m.DiscountCategory.objects.all()
        query = get_object_or_404(queryset, pk=pk)
        serializer = s.DiscountCategorySerializer(
            query, context={"request": request})
        serializer_data = serializer.data
        return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})

    def update(self, request, pk=None):
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
        data = m.PartyOrder.objects.all()
        serializer = s.PartyOrderSerializer(
            data, many=True, context={"request": request})
        response_dict = {
            "error": False, "message": "All List Data", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
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
        queryset = m.PartyOrder.objects.all()
        query = get_object_or_404(queryset, pk=pk)
        serializer = s.PartyOrderSerializer(
            query, context={"request": request})
        serializer_data = serializer.data
        return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})

    def update(self, request, pk=None):
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
        data = m.Recovery.objects.all()
        serializer = s.RecoverySerializer(
            data, many=True, context={"request": request})
        response_dict = {
            "error": False, "message": "All List Data", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
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
        queryset = m.Recovery.objects.all()
        query = get_object_or_404(queryset, pk=pk)
        serializer = s.RecoverySerializer(
            query, context={"request": request})
        serializer_data = serializer.data
        return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})

    def update(self, request, pk=None):
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
    try:
        pt = m.PartyOrder.objects.get(id=id)
        pt.status = 'Approved'
        pt.save()
        return JsonResponse({'error':False,'data':'Successfuly Updated'})
    except:
        return JsonResponse({'error':True,'data':'Something went"s wrong'})
    
def RecoveryStatusChange(request,id):
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
        return m.PartyLedger.objects.filter(driver=party, date__lte=t_date, date__gte=f_date)

class SalesOfficerLedgerFilter(generics.ListAPIView):
    serializer_class = s.SalesOfficerSerializer

    def get_queryset(self):
        f_date = self.kwargs['FromDate']
        t_date = self.kwargs['ToDate']
        sales_officer = self.kwargs['sales_officer']
        return m.SalesOfficer.objects.filter(sales_officer=sales_officer, date__lte=t_date, date__gte=f_date)


