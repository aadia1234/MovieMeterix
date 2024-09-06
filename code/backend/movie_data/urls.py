from django.urls import path
from . import views

from rest_framework import routers
from movie_data import views
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'categories', views.CatgeoryView, 'category')
router.register(r'movies', views.MovieView, 'movies')
router.register(r'comments', views.CommentView, 'comments')

urlpatterns = [
    path("", include(router.urls))
]