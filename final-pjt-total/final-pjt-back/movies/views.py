from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import MovieSerializer, MovieListSerializer
from .models import Movie, Genre

# Create your views here.
@api_view(['GET'])
def movieList(request):
    if request.method == 'GET':
        movie = Movie.objects.all()
        serializer = MovieListSerializer(movie, many=True)
        return Response(serializer.data)