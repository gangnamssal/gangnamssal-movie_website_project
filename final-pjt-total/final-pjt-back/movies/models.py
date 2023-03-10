from django.db import models
from django.conf import settings


# Create your models here.
class Movie(models.Model):
    # like_movie_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="like_user_movies", blank=True, null=True)
    title = models.CharField(max_length=150)
    release_date = models.DateField()
    adult = models.BooleanField()
    overview = models.TextField()
    popularity = models.FloatField()
    poster_path = models.CharField(max_length=150, blank=True, null=True)
    genre_ids = models.CharField(max_length=150)

class Genre(models.Model):
    movies = models.ManyToManyField(Movie,blank=True, null=True)
    name = models.CharField(max_length=150)



class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    like_review_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="like_user_reviews", blank=True, null=True)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, default=0)
    title = models.CharField(max_length=150)
    movie_title = models.CharField(max_length=150)
    rank = models.FloatField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    review = models.ForeignKey(Review, on_delete=models.CASCADE, default=0)
    content = models.TextField()

class MovieLike(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    movieLike = models.ForeignKey(Movie, on_delete=models.CASCADE, default=0)

class ReviewLike(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    reviewLike = models.ForeignKey(Review, on_delete=models.CASCADE, default=0)

class UserPreferGenre(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    prefer_genre = models.ForeignKey(Genre, on_delete=models.CASCADE, default=0)

class Profile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    nickname = models.CharField(max_length=15, blank=True, null=True)
    mbti = models.CharField(max_length=4, blank=True, null=True)

    
