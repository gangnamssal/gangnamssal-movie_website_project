from django.db import models
from django.conf import settings

# Create your models here.
class Movie(models.Model):
    like_movie_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="like_user_movies")
    title = models.CharField(max_length=150)
    release_date = models.DateField()
    adult = models.BooleanField()
    overview = models.TextField()
    popularity = models.FloatField()
    poster_path = models.CharField(max_length=150)
    # innermovie_id = models.IntegerField()


class Genre(models.Model):
    movies = models.ManyToManyField(Movie)
    name = models.CharField(max_length=150)
    # innergenre_id = models.IntegerField()
