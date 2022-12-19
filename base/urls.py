from django.urls import path, include


urlpatterns = [
    path('products/', include('base.url_extend.product_urls')),
    path('users/', include('base.url_extend.user_urls')),
    path('orders/', include('base.url_extend.order_urls')),
]

