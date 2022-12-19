from django.urls import path
from base.views.user_views import updateUserProfile
from base.views.user_views import MyTokenObtainPairView, getUserProfile, getUsers, registerUser,deleteUser,updateUser, getUserById

urlpatterns =[
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', getUserProfile, name='user-profile'),
    path('', getUsers, name='users'),
    path('register/', registerUser, name='register'),
    path('profile/update/', updateUserProfile, name='user-profile-update'),
    path('update/<str:pk>/', updateUser, name='user-update'),
    path('<str:pk>/', getUserById, name='user'),
    path('delete/<str:pk>/', deleteUser, name='user-delete'),
]