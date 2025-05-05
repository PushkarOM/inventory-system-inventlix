from django.db import models




class InventoryItem(models.Model):
    code =  models.CharField(max_length=10,unique=True) # for product SKU
    product_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10,decimal_places=2) # largest Number will be 9999999.99
    category = models.CharField(max_length=100)
    date_added = models.DateTimeField(auto_now_add=True) # add the data and time the item was created

    def __str__(self):
        return f"{self.code} - {self.name}" # String Represntation of the Object