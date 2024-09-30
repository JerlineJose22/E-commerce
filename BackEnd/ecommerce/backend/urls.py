from django.urls import path
from backend.views import *

urlpatterns = [
    path('list/',Product_list.as_view(),name='product-list'),
    path('list/<int:pk>/',Single_product.as_view(),name="product"),
    path('category/',Category_list.as_view(),name="category-list"),
    path('category/<int:pk>/',Single_category.as_view(),name="category"),
    path('list/category/<int:pk>/product/',ProductByCategory.as_view(),name="product-by-category")
]