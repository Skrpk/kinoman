from rest_framework import serializers
from catalog.models import Film, Genre
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User


class FilmPreviewSerializer(serializers.ModelSerializer):
   class Meta:
       model = Film
       fields = [
           'title',
           'genres',
           'summary',
           'movie_id'
       ]


class FilmDetailSerializer(serializers.ModelSerializer):
   class Meta:
       model = Film
       fields = [
           'title',
           'genres',
           'summary',
           'movie_id'
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