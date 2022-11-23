from django.urls import path
from . import views

urlpatterns = [
    # movie
    path('',views.movieList),
    path('<int:movie_pk>/',views.movieDetail),
    # genre
    path('genres/',views.genreList),
    path('genres/<int:genre_pk>/',views.genreDetail),
    # review
    path('<int:movie_pk>/reviews/', views.reviewList),
    path('reviews/<int:review_pk>/', views.review_detail),
    # comment
    path('reviews/<int:review_pk>/comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    # 영화 좋아요
    path('<int:movie_pk>/movielike/', views.movieLike),
    # 영화 좋아요 취소
    path('movielike/<int:movielike_pk>/', views.movieLikeDelete),
    # 리뷰 좋아요
    path('<int:review_pk>/reviewlike/', views.reviewLike),
    # 리뷰 좋아요 취소
    path('reviewlike/<int:reviewlike_pk>/', views.reviewLikeDelete),
    # 유저 프로필 전체 조회
    path('profile/', views.allUserProfileInfo),
    # 유저 디테일 프로필 조회
    path('<int:user_id>/profile/', views.userProfileInfo),
    # 전체 유저 선호 장르
    path('userprefergenre/', views.totalUserPreferGenre),
    # 유저 선호 장르
    path('<int:genre_id>/userprefergenre/',views.userprefergenre),
    # 유저 선호 장르 취소
    path('userprefergenre/<int:userprefergenre_pk>/', views.userprefergenreDelete)
]
