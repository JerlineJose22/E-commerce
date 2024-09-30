from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from backend.models import Product,Category
from backend.serializer import ProductSerializer,CategorySerializer
import logging
# Create your views here.

logging.basicConfig(
    filename='app.log',        # Log file name
    filemode='a',              # Append mode ('w' for overwrite mode)
    format='%(asctime)s - %(levelname)s - %(message)s',  # Log message format
    level=logging.DEBUG        # Set the lowest level to capture
)

class Product_list(APIView):
    def get(self,request):
        try:
            products=Product.objects.all()
            # print(products)
            serializer=ProductSerializer(products,many=True)
            # print(serializer.data)
            logging.info("data Fetched")
            return Response(serializer.data)
        except Product.DoesNotExist:
            logging.error('No data found , HTTP_404_NOT_FOUND')
            return Response("No data found",status=status.HTTP_404_NOT_FOUND)
        
    def post(self,request):
        # products=Product.objects.all()
        serializer=ProductSerializer(data=request.data)
        # print(serializer)
        if serializer.is_valid():
            serializer.save()
            logging.info(f"data posted- {serializer.data}")
            return Response("posted data", status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
class Single_product(APIView):
    def get(self,request,pk):
        try:
            product=Product.objects.get(pk=pk)
            serializer=ProductSerializer(product)
            logging.info(f"data Fetched-{serializer.data}")
            return Response(serializer.data)
        except Product.DoesNotExist:
            logging.error('No data found , HTTP_404_NOT_FOUND')
            return Response("No data found",status=status.HTTP_404_NOT_FOUND)
        
    def put(self,request,pk):
        try:
            product=Product.objects.get(pk=pk)
            serializer=ProductSerializer(product,data=request.data)
            if serializer.is_valid():
                serializer.save()
                logging.info(f"data updated- {serializer.data}")
                return Response("updated",status=status.HTTP_202_ACCEPTED)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            logging.error('Can not Update the data, HTTP_404_NOT_FOUND')
            return Response("Can not Update the data",status=status.HTTP_204_NO_CONTENT)
        
    def delete(self,request,pk):
        try:
            product=Product.objects.get(pk=pk)
            product.delete()
            logging.warning(f"data deleted- {product}")
            return Response("deleted",status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            logging.error('No data found , HTTP_404_NOT_FOUND')
            return Response("No data found",status=status.HTTP_204_NO_CONTENT)
        
class Category_list(APIView):
    def get(self,request):
        try:
            category=Category.objects.all()
            serializer=CategorySerializer(category,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            return Response("No data found",status=status.HTTP_204_NO_CONTENT)
        
    def post(self,request):
        try:
            category=Category.objects.all()
            serializer=CategorySerializer(category,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            
        except Category.DoesNotExist:
            return Response("No data found",status=status.HTTP_404_NOT_FOUND)
        
class Single_category(APIView):
    def get(self,request,pk):
        try:
            category=Category.objects.get(pk=pk)
            serializer=CategorySerializer(category)
            return Response(serializer.data)
        except Category.DoesNotExist:
            return Response("No data found",status=status.HTTP_404_NOT_FOUND)
        
    def put(self,request,pk):
        try:
            category=Category.objects.get(pk=pk)
            serializer=CategorySerializer(category,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response("updated",status=status.HTTP_202_ACCEPTED)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Category.DoesNotExist:
            return Response("No data found",status=status.HTTP_404_NOT_FOUND)        
    def delete(self,request,pk):
        try:
            category=Category.objects.get(pk=pk)
            category.delete()
            return Response("deleted",status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response("No data found",status=status.HTTP_204_NO_CONTENT)
        
class ProductByCategory(APIView):
    def get(self,request,pk):
        try:
            category=Category.objects.get(pk=pk)
            product=Product.objects.filter(category=category)
            serializer=ProductSerializer(product,many=True)
            return Response(serializer.data)
        except Category.DoesNotExist:
            return Response("Category not found", status=status.HTTP_404_NOT_FOUND)
        except Product.DoesNotExist:
            return Response("No product found for this category", status=status.HTTP_404_NOT_FOUND)