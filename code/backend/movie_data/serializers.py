from rest_framework import serializers
from movie_data.models import Category, Movie, Comment

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ("id", "title", "rating", "banner", "body", "created_on", "last_modified", "category")

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("id", "author", "body", "created_on", "movie")