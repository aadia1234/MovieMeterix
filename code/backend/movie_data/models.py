from django.db import models
from django.conf import settings
from tinymce.models import HTMLField
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

class UUIDModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)

    class Meta:
        abstract=True

class Category(UUIDModel):
    name = models.CharField(max_length=30)
    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name

class Movie(UUIDModel):
    title = models.CharField(max_length=255)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    banner = models.ImageField(upload_to="movie_banners/")
    body = HTMLField()
    created_on = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Comment(UUIDModel):
    author = models.CharField(max_length=60)
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.author} on \"{self.movie}\""