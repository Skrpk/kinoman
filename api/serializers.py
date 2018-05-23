from rest_framework import serializers
from catalog.models import Film, Genre
from .models import Rating
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User


class FilmPreviewSerializer(serializers.ModelSerializer):
   class Meta:
       model = Film
       fields = [
           'title',
           'genres',
           'movie_id'
       ]


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = [
            'rating'
        ]

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(min_length=8)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

class GenresSerializer(serializers.ModelSerializer):
   class Meta:
       model = Genre
       fields = [
           'id',
           'name'
       ]