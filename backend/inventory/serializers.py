from rest_framework import serializers
from .models import InventoryItem


# Serializer for InventoryItem
class InventoryItemSerializer(serializers.ModelSerializer):

    stock_level = serializers.SerializerMethodField()

    class Meta:
        model = InventoryItem
        fields = '__all__'


    # Validating the Price and Qunatity Feilds
    def validate_quantity(self, value):
        if value < 0:
            raise serializers.ValidationError("Quantity cannot be negative.")
        return value

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative.")
        return value

    # Validating Category Feild - Value can only be one of the below
    def validate_category(self, value):
        allowed = ["Electronics", "Stationery", "Apparel"]
        if value not in allowed:
            raise serializers.ValidationError("Invalid category.")
        return value



    # getting the stock level "warning"
    def get_stock_level(self, obj):
        if obj.quantity < 25 :
            return "low"
        elif obj.quantity < 100:
            return "Medium"
        else :
            return "High"