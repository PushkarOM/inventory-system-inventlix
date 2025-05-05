from rest_framework import serializers
from .models import InventoryItem


# Serializer for InventoryItem
class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = '__all__'

