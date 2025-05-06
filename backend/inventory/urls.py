from django.urls import path
from .views import InventoryItemListCreateView, InventoryItemRetrieveUpdateDestroyView, ExportInventoryCSV, InventoryItemListAllView

urlpatterns = [
    path('items/',InventoryItemListCreateView.as_view(),name = 'item-list-create'),  # get all , create new api
    path('items/<int:pk>/',InventoryItemRetrieveUpdateDestroyView.as_view(),name = 'item-details'), # retrive update delete api 
    path('export/', ExportInventoryCSV.as_view(), name='export-inventory'),
    path('allitems/',InventoryItemListAllView.as_view(), name = 'list-all-items')
]