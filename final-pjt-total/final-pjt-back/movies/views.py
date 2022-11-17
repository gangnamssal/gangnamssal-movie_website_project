from django.shortcuts import render

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import MovieDetailerializer, MovieListSerializer, GenreListSerializer, GenreDetailSerializer,ReviewListSerializer,CommentSerializer,ReviewDetailSerializer,CommentDetailSerializer
from .models import Movie, Genre, Review,Comment

# Create your views here.
@api_view(['GET'])
def movieList(request):
    if request.method == 'GET':
        movie = Movie.objects.all()
        serializer = MovieListSerializer(movie, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def movieDetail(request,movie_pk):
    if request.method == 'GET':
        movie = Movie.objects.get(pk=movie_pk)
        serializer = MovieDetailerializer(movie)
        return Response(serializer.data)

@api_view(['GET'])
def genreList(request):
    if request.method == 'GET':
        genre = Genre.objects.all()
        serializer = GenreListSerializer(genre, many=True)
        return Response(serializer.data) 

@api_view(['GET'])
def genreDetail(request,genre_pk):
    if request.method == 'GET':
        genre = Genre.objects.get(pk=genre_pk)
        serializer = GenreDetailSerializer(genre)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
def reviewList(request, movie_pk):
    movie = Movie.objects.get(pk = movie_pk)
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
    review = Review.objects.get(pk=review_pk)
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
    review = Review.objects.get(pk=review_pk)
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
    comment = Comment.objects.get(pk=comment_pk)
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

