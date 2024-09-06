from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from movie_data.models import *
from .serializers import *



class CatgeoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class MovieView(viewsets.ModelViewSet):
    serializer_class = MovieSerializer

    def get_queryset(self):
        queryset = Movie.objects.all().order_by("last_modified").reverse()
        category = self.request.query_params.get("category")
        title = self.request.query_params.get("title")
        if category is not None:
            queryset = queryset.filter(category=category)
        if title is not None:
            queryset = queryset.filter(title=title)
        return queryset

class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.all().order_by("created_on")
        movie = self.request.query_params.get("movie")
        if movie is not None:
            queryset = queryset.filter(movie=movie)
        return queryset