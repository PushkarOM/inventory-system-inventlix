from rest_framework import generics , filters, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
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
