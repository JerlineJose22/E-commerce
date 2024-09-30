from backend.models import Product,Category
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model=Product
        fields="__all__"
        
    def get_image_url(self,obj):
        url = obj.image.url
        return f"http://127.0.0.1:8000{url}"
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields="__all__"