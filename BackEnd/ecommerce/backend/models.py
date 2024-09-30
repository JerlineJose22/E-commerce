from django.db import models

# Create your models here.
class Category(models.Model):
    name= models.CharField(max_length=50)
    
class Product(models.Model):
    title=models.CharField(max_length=500)
    price=models.IntegerField()
    description=models.TextField()
    image=models.ImageField(upload_to='product/',null=True)
    category=models.ForeignKey(Category,null=True,on_delete=models.SET_NULL)
    