import csv
from django.http import HttpResponse
from rest_framework import generics , filters, viewsets
from rest_framework.views import APIView 
from rest_framework.permissions import IsAuthenticatedOrReadOnly , IsAuthenticated
from .models import InventoryItem
from .serializers import InventoryItemSerializer
from django_filters.rest_framework import DjangoFilterBackend


#  GET (list all) , POST (create new)
class InventoryItemListCreateView(generics.ListCreateAPIView):

    permission_classes = [IsAuthenticatedOrReadOnly]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = {
        'category': ['exact'],
        'code': ['exact'],
        'quantity': ['lt', 'lte', 'gt', 'gte', 'exact'],
        'price': ['lt', 'lte', 'gt', 'gte', 'exact'],
    }
    search_fields = ['product_name']   # for partial matching

    queryset = InventoryItem.objects.all()


    serializer_class = InventoryItemSerializer


# GET ("get" one) , PUT/PATCH (update one), DELETE
class InventoryItemRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = [IsAuthenticatedOrReadOnly]


    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer



# GET API Endpoint for Exporting the stock as CSV File
class ExportInventoryCSV(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="inventory.csv"'

        writer = csv.writer(response)
        writer.writerow(['Code', 'Product Name', 'Quantity', 'Price', 'Category', 'Date Added'])

        for item in InventoryItem.objects.all():
            writer.writerow([
                item.code,
                item.product_name,
                item.quantity,
                item.price,
                item.category,
                item.date_added.strftime("%Y-%m-%d %H:%M")
            ])

        return response