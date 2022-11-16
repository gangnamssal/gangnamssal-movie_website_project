from django.urls import path
from . import views

urlpatterns = [
    #movie
    path('',views.movieList),
    path('<int:movie_pk>/',views.movieDetail),
    #genre
    path('genres/',views.genreList),
    path('genres/<int:genre_pk>/',views.genreDetail),
    path('genres/',views.genreList),
    #review
    path('<int:movie_pk>/reviews/', views.reviewList),
    path('reviews/<int:review_pk>/', views.review_detail),
    #comment
    path('reviews/<int:review_pk>/comments', views.comment_list),
    path('comments/<int:comment_pk>', views.comment_detail),
]
