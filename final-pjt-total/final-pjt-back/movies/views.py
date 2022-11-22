from django.shortcuts import render, get_list_or_404, get_object_or_404

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


from .serializers import (MovieDetailerializer, MovieListSerializer, GenreListSerializer, 
                            GenreDetailSerializer,ReviewListSerializer,CommentSerializer,
                            ReviewDetailSerializer,CommentDetailSerializer,MovieLikeSerializer,
                            ReviewLikeSerializer, ProfileSerializer,ProfileDetailSerializer)
from .models import Movie, Genre, Review,Comment, MovieLike,ReviewLike, Profile

from django.contrib.auth import get_user_model
from accounts.models import User

# Create your views here.
@api_view(['GET'])
def movieList(request):
    if request.method == 'GET':
        # movie = Movie.objects.all()
        movie = get_list_or_404(Movie)
        serializer = MovieListSerializer(movie, many=True)
        return Response(serializer.data)

@api_view(['GET', 'PUT'])
def movieDetail(request,movie_pk):
    if request.method == 'GET':
        # movie = Movie.objects.get(pk=movie_pk)
        movie = get_object_or_404(Movie, pk=movie_pk)
        serializer = MovieDetailerializer(movie)
        return Response(serializer.data)


@api_view(['GET'])
def genreList(request):
    if request.method == 'GET':
        # genre = Genre.objects.all()
        genre = get_list_or_404(Genre)
        serializer = GenreListSerializer(genre, many=True)
        return Response(serializer.data) 

@api_view(['GET','PUT'])
def genreDetail(request,genre_pk):
    genre = get_object_or_404(Genre, pk=genre_pk)
    if request.method == 'GET':
        # genre = Genre.objects.get(pk=genre_pk)
        serializer = GenreDetailSerializer(genre)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = GenreDetailSerializer(genre,data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(genre_user=request.user)
            return Response(serializer.data)

@api_view(['GET', 'POST'])
def reviewList(request, movie_pk):
    # movie = Movie.objects.get(pk = movie_pk)
    movie = get_object_or_404(Movie, pk=movie_pk)
    if request.method == 'GET':
        reviews = Review.objects.filter(movie=movie_pk)
        serializer = ReviewListSerializer(reviews, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ReviewListSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(movie = movie)
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET','PUT','DELETE',])
def review_detail(request, review_pk):
    # review = Review.objects.get(pk=review_pk)
    review = get_object_or_404(Review, pk=review_pk)
    if request.method == 'GET':
        serializer = ReviewDetailSerializer(review)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ReviewDetailSerializer(review,data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    elif request.method == 'DELETE':
        review.delete()
        return Response('{성공}',status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def comment_list(request, review_pk):
    # review = Review.objects.get(pk=review_pk)
    review = get_object_or_404(Review, pk=review_pk)
    if request.method == 'GET':
        comments = Comment.objects.filter(review=review_pk)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(review=review)
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET','PUT','DELETE',])
def comment_detail(request,comment_pk):
    # comment = Comment.objects.get(pk=comment_pk)
    comment = get_object_or_404(Comment, pk=comment_pk)
    if request.method == 'GET':
        serializer = CommentDetailSerializer(comment)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CommentDetailSerializer(instance=comment,data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    elif request.method == 'DELETE':
        comment.delete()
        return Response('{성공}',status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def movieLike(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if request.method == 'POST':
        serializer = MovieLikeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(movieLike = movie)
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
def movieLikeDelete(request, movielike_pk):
    # review = Review.objects.get(pk=review_pk)
    movielike = get_object_or_404(MovieLike, pk=movielike_pk)
    if request.method == 'DELETE':
        movielike.delete()
        return Response('{성공}',status=status.HTTP_204_NO_CONTENT)


#리뷰 좋아요
@api_view(['POST'])
def reviewLike(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    if request.method == 'POST':
        serializer = ReviewLikeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(reviewLike = review)
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
def reviewLikeDelete(request, reviewlike_pk):
    # review = Review.objects.get(pk=review_pk)
    reviewlike = get_object_or_404(ReviewLike, pk=reviewlike_pk)
    if request.method == 'DELETE':
        reviewlike.delete()
        return Response('{성공}',status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def allUserProfileInfo(request):
    if request.method == 'GET':
        profile = Profile.objects.all()
        serializer = ProfileSerializer(profile, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT', 'GET'])
def userProfileInfo(request, user_id):
    profile = Profile.objects.get(pk = user_id)
    if request.method == 'PUT':
        serializer = ProfileDetailSerializer(profile, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    elif request.method == 'GET':
        serializer = ProfileDetailSerializer(profile)
        return Response(serializer.data)
    