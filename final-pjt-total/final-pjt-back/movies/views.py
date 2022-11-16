from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import MovieDetailerializer, MovieListSerializer
from .models import Movie, Genre

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