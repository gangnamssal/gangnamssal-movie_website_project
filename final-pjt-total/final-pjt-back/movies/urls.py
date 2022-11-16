from django.urls import path
from . import views

urlpatterns = [
    path('',views.movieList),
    path('<int:movie_pk>/',views.movieDetail),
    path('genres/',views.genreList),
    path('genres/<int:genre_pk>/',views.genreDetail),
    path('genres/',views.genreList),
    path('reviews/<int:movie_pk>/', views.reviewList),
]
