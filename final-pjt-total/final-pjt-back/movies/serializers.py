from rest_framework import serializers
from .models import Movie, Genre, Review, Comment, MovieLike, ReviewLike,Profile,UserPreferGenre
from django.contrib.auth import get_user_model

# 리뷰에 대한 전체 댓글
class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('review',)


# 리뷰 좋아요
class ReviewLikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReviewLike
        fields = '__all__'



# 전체 리뷰
class ReviewListSerializer(serializers.ModelSerializer):
    reviewlike_set = ReviewLikeSerializer(many=True, read_only=True)
    reviewlike_count = serializers.IntegerField(source='reviewlike_set.count', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    comment_set = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Review
        fields = ('id','user','username','movie','title','movie_title','rank','content','created_at','updated_at','comment_set','reviewlike_set','reviewlike_count',)
        read_only_fields = ('user','movie','like_review_users','username',)

# 영화 좋아요
class MovieLikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = MovieLike
        fields = '__all__'

# 전체 영화 리스트
class MovieListSerializer(serializers.ModelSerializer):
    movielike_set = MovieLikeSerializer(many=True, read_only=True)
    movielike_count = serializers.IntegerField(source='movielike_set.count', read_only=True)
    review_set = ReviewLikeSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'




# 특정 영화 정보
class MovieDetailerializer(serializers.ModelSerializer):
    # reviewlike_set = ReviewLikeSerializer(many=True, read_only=True)
    review_set = ReviewListSerializer(many=True, read_only=True)
    movielike_set = MovieLikeSerializer(many=True, read_only=True)
    class Meta:
        model = Movie
        fields = '__all__'
        


# 리뷰 디테일
class ReviewDetailSerializer(serializers.ModelSerializer):
    reviewlike_set = ReviewLikeSerializer(many=True, read_only=True)
    reviewlike_count = serializers.IntegerField(source='reviewlike_set.count', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    comment_set = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Review
        fields = '__all__'
        # read_only_fields = ('user','movie','like_review_users',)

# 유저 장르 리스트
class UserPreferGenreSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserPreferGenre
        fields = '__all__'

# 전체 장르 리스트
class GenreListSerializer(serializers.ModelSerializer):
    userprefergenre_set = UserPreferGenreSerializer(many=True, read_only=True)
    class Meta:
        model = Genre
        fields = '__all__'


# 특정 장르
class GenreDetailSerializer(serializers.ModelSerializer):
    userprefergenre_set = UserPreferGenreSerializer(many=True, read_only=True)
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

# class UserSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = get_user_model()
#         fields = '__all__'

# 유저 프로필
class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = '__all__'

# 유저 디테일 프로필
class ProfileDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = '__all__'

# 유저 정보
class UserInfoSerializer(serializers.ModelSerializer):
    movielike_set = MovieLikeSerializer(many=True, read_only=True)
    reviewlike_set = ReviewLikeSerializer(many=True, read_only=True)
    review_set = ReviewListSerializer(many=True, read_only=True)
    userprefergenre_set = UserPreferGenreSerializer(many=True, read_only=True)
    class Meta:
        model = get_user_model()
        exclude = ('password','is_superuser',)