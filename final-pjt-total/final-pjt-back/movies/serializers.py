from rest_framework import serializers
from .models import Movie, Genre, Review, Comment


# 전체 영화 리스트
class MovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = '__all__'

# 특정 영화 정보
class MovieDetailerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        exclude = ('id',)

# 전체 장르 리스트
class GenreListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = '__all__'
        read_only_field = ('movie',)

# 특정 장르
class GenreDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = '__all__'

# 전체 리뷰
class ReviewListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'