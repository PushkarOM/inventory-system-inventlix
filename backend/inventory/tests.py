from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework import status
from .models import InventoryItem

class InventroyItemTests(TestCase):


    def setUp(self):
        # Creating test user
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.token = Token.objects.create(user=self.user)
        self.auth_header = {'HTTP_AUTHORIZATION': f'Token {self.token.key}'}

        # Creating an item for testing
        self.item = InventoryItem.objects.create(
            code="ITEM001",
            product_name="Test Item",
            quantity=10,
            price=99.99,
            category="Electronics"
        )

        self.list_url = reverse('item-list-create')
        self.detail_url = reverse('item-details', args=[self.item.id])

    
    # Without Authentication
    def test_get_list_without_auth(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_without_auth(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_without_auth(self):
        data = {
            "code": "ITEM002",
            "product_name": "Unauthorized Item",
            "quantity": 5,
            "price": "19.99",
            "category": "Books"
        }
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_without_auth(self):
        data = {
            "code": "ITEM001",
            "product_name": "Should Fail",
            "quantity": 15,
            "price": "89.99",
            "category": "Toys"
        }
        response = self.client.put(self.detail_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_without_auth(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_export_inventory_csv_without_auth(self):
        url = reverse('export-inventory')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 401)



    # With Authentication
    def test_post_with_auth(self):
        data = {
            "code": "ITEM002",
            "product_name": "Authorized Item",
            "quantity": 5,
            "price": "49.99",
            "category": "Stationery"
        }
        response = self.client.post(self.list_url, data, format='json', **self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_put_with_auth(self):
        
        data =  {
            "code": "PRD109",
            "product_name": "Bluetooth EarBuds Updated Via Put",
            "quantity": 50,
            "price": "89.99",
            "category": "Electronics"
        }   
        
        response = self.client.put(self.detail_url, data, content_type='application/json' ,**self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_with_auth(self):
        response = self.client.delete(self.detail_url, **self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_export_inventory_csv_with_auth(self):
        url = reverse('export-inventory')
        response = self.client.get(url, **self.auth_header)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], 'text/csv')

        # checking the response
        content = response.content.decode('utf-8')
        lines = content.strip().split('\n')
        self.assertIn('Code,Product Name,Quantity,Price,Category,Date Added', lines[0])