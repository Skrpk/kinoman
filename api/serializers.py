from rest_framework import serializers
from catalog.models import Film


class FilmPreviewSerializer(serializers.ModelSerializer):
   class Meta:
       model = Film
       fields = [
           'id',
           'title',
           'director',
           'summary',
       ]


class FilmDetailSerializer(serializers.ModelSerializer):
   class Meta:
       model = Film
       fields = [
           'title',
           'director',
           'summary',
       ]