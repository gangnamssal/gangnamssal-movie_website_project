from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import MovieDetailerializer, MovieListSerializer, GenreListSerializer, GenreDetailSerializer,ReviewListSerializer
from .models import Movie, Genre, Review

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
        review = Review.objects.filter(movie=movie_pk)
        serializer = ReviewListSerializer(review, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ReviewListSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(movie = movie)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

