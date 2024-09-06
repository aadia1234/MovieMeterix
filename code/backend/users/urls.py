
from django.urls import path
from . import views
from .views import UserDetailView
from rest_framework import routers
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', views.UserCreateView.as_view(), name='api-register'),
    path("auth/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("user/", UserDetailView.as_view(), name="user_details")
]