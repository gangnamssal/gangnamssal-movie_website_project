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



class Genre(models.Model):
    movies = models.ManyToManyField(Movie)
    name = models.CharField(max_length=150)



class Review(models.Model):
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # like_review_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="like_user_reviews")
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, default=0)
    title = models.CharField(max_length=150)
    movie_title = models.CharField(max_length=150)
    rank = models.IntegerField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    content = models.TextField()
