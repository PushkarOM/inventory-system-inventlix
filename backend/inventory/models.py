from django.db import models


class InventoryItem(models.Model):
    code =  models.CharField(max_length=10,unique=True,blank=False) # for product SKU
    product_name = models.CharField(max_length=100,blank=False)
    quantity = models.IntegerField(null=False)
    price = models.DecimalField(max_digits=10,decimal_places=2,null=False) # largest Number will be 9999999.99
    category = models.CharField(max_length=100,blank=False)
    date_added = models.DateTimeField(auto_now_add=True) # add the data and time the item was created
    image = models.ImageField(upload_to='product_images/', null=True, blank=True) # Product Images


    def __str__(self):
        return f"{self.code} - {self.product_name}" # String Represntation of the Object