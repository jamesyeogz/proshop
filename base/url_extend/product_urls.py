
from django.urls import path
import base.views.product_views
urlpatterns =[
    path('', base.views.product_views.getProducts, name='products'),
    path('top/', base.views.product_views.getTopProducts, name='top-products'),
    path('create/', base.views.product_views.createProduct, name='product-create'),
    path('upload/', base.views.product_views.uploadImage, name='upload-image'),
    path('<str:pk>/reviews/', base.views.product_views.createProductReview, name='create-review'),
    path('<str:pk>/', base.views.product_views.getProduct, name='products'),
    path('delete/<str:pk>/', base.views.product_views.deleteProducts, name='product-delete'),
    path('update/<str:pk>/',base.views.product_views.updateProduct, name='product-update')
]
