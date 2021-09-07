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


class SalesPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.SalesPerson
        fields = '__all__'

class DiscountPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.DiscountPerson
        fields = '__all__'

class FreightPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.FreightPerson
        fields = '__all__'

class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Bank
        fields = '__all__'

class ClearingPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.ClearingPerson
        fields = '__all__'

class CashPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.CashPerson
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

class SalesLedgerSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.SalesLedger
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['sales_person'] = SalesPersonSerializer(instance.sales_person).data
        response['category'] = CategorySerializer(instance.category).data
        response['product'] = ProductSerializer(instance.product).data
        return response

class FreightLedgerSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.FreightLedger
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['freight_person'] = FreightPersonSerializer(instance.freight_person).data
        response['category'] = CategorySerializer(instance.category).data
        response['product'] = ProductSerializer(instance.product).data
        return response

class DiscountLedgerSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.DiscountLedger
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['discount_person'] = m.DiscountPerson(instance.discount_person).data
        response['category'] = CategorySerializer(instance.category).data
        response['product'] = ProductSerializer(instance.product).data
        return response

class BankLedgerSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.BankLedger
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['bank'] = BankSerializer(instance.bank).data
        return response

class ClearingLedgerSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.ClearingLedger
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['clearing_person'] = CashPersonSerializer(instance.clearing_person).data
        return response

class CashLedgerSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.CashLedger
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['cash_person'] = ClearingPersonSerializer(instance.clearing_person).data
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

