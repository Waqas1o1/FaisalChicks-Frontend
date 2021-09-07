from django.db import models
from django.db.models import fields
from rest_framework import serializers
from . import models as m

# Table
class PartySerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Party
        fields = '__all__'

class SalesOfficerSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.SalesOfficer
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Product
        fields = '__all__'

class DiscountCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = m.DiscountCategory
        fields = '__all__'


# Ledger
class PartyLedgerSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.PartyLedger
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['party'] = PartySerializer(instance.party).data
        response['sales_officer'] = SalesOfficerSerializer(instance.sales_officer).data
        response['category'] = CategorySerializer(instance.category).data
        response['product'] = ProductSerializer(instance.product).data
        return response

class SalesOfficerLedgerSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.SalesOfficerLedger
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['sales_officer'] = SalesOfficerSerializer(instance.sales_officer).data
        response['category'] = CategorySerializer(instance.category).data
        response['product'] = ProductSerializer(instance.product).data
        return response


# UI

class PartyOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.PartyOrder
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['party'] = PartyLedgerSerializer(instance.party).data
        response['sales_officer'] = SalesOfficerSerializer(instance.sales_officer).data
        response['category'] = CategorySerializer(instance.category).data
        response['product'] = ProductSerializer(instance.product).data
        return response


class RecoverySerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Recovery
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['party'] = PartyLedgerSerializer(instance.party).data
        response['party_order'] = PartyOrderSerializer(instance.party_order).data
        response['sales_officer'] = SalesOfficerSerializer(instance.sales_officer).data
        return response

