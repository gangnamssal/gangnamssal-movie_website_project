from rest_framework import serializers
from .models import Movie, Genre, Review, Comment


# 전체 영화 리스트
class MovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = '__all__'

# 리뷰에 대한 전체 댓글
class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('review',)

# 전체 리뷰
class ReviewListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    comment_set = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Review
        fields = ('id','user','username','movie','title','movie_title','rank','content','created_at','updated_at','comment_set',)
        read_only_fields = ('user','movie','like_review_users','username',)


# 특정 영화 정보
class MovieDetailerializer(serializers.ModelSerializer):

    review_set = ReviewListSerializer(many=True, read_only=True)
    
    class Meta:
        model = Movie
        exclude = ('id',)
        


# 리뷰 디테일
class ReviewDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    comment_set = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Review
        fields = '__all__'
        # read_only_fields = ('user','movie','like_review_users',)


# 전체 장르 리스트
class GenreListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = '__all__'
        read_only_fields = ('movie',)

# 특정 장르
class GenreDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = '__all__'


# 댓글 디테일
class CommentDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
        # read_only_fields = ('review',)