from django.contrib import admin
from movie_data.models import Category, Movie, Comment

class CategoryAdmin(admin.ModelAdmin):
    pass

class MovieAdmin(admin.ModelAdmin):
    pass

class CommentAdmin(admin.ModelAdmin):
    pass

admin.site.register(Category, CategoryAdmin)
admin.site.register(Movie, MovieAdmin)
admin.site.register(Comment, CommentAdmin)