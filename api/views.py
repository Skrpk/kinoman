from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework_jwt.settings import api_settings
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core import serializers as sz
from .serializers import *
from .pagination import GetPageNumberPagination
from catalog.models import Film, Genre
from django.contrib.auth.models import User
from .models import Rating
from rest_framework import generics
import json
import pickle
import numpy as np
import datetime

model = pickle.load(open("model.p", "rb"))

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class FilmViewSet(generics.ListAPIView):
    queryset = Film.objects.all()
    permission_classes = (permissions.AllowAny,)
    pagination_class = GetPageNumberPagination
    serializer_class = FilmPreviewSerializer

    def get_queryset(self, id):
        if id:
            return Film.objects.filter(genres=id).order_by('-year')
        else:
            return Film.objects.all().order_by('-year')

    def list(self, request):
        genre_id = request.GET.get('genre', None)

        queryset = self.get_queryset(genre_id)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get(self, request):
        return self.list(request)

class getRecommedations(generics.ListAPIView):
    serializer_class = FilmPreviewSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def list(self, request, id):
        films_count = Film.objects.count()
        films = Film.objects.all()
        recommended_films_indexes_array = model.predict(id, np.arange(films_count))
        result = Film.objects.filter(index__in=np.argsort(recommended_films_indexes_array)[:10])

        serializer = self.get_serializer(result, many=True)
        return Response(serializer.data)

    def get(self, request, *args, **kwargs):
        id = kwargs['id'].split(sep="=")[1]
        return self.list(request, id)

class getRating(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = RatingSerializer

    def get(self, request, *args, **kwargs):
        print('********************************************')
        print(kwargs['movie_id'], kwargs['user_id'])

        print('********************************************')
        rating = Rating.objects.filter(
                                    user_id=kwargs['user_id'],
                                    movie_id=kwargs['movie_id']
        )

        if not rating:
            return Response({'rating': '0'})
        else:
            serializer = self.get_serializer(rating[0])
            return Response(serializer.data)

class rateMovie(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        rating = Rating.objects.create(
            movie_id=request.data['movieId'],
            user_id=request.data['userId'],
            rating=request.data['rating'],
            type='explicit',
            rating_timestamp=datetime.datetime.now()
        )
        return Response('Saved')


class GenresViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Genre.objects.all()
    permission_classes = (permissions.AllowAny,)

    def get_serializer_class(self):
        return GenresSerializer

class UserCreate(APIView):
    """
    Creates the user.
    """
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                # token = Token.objects.create(user=user)
                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)
                return Response({'token': token}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePassword(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = get_object_or_404(User, username=request.user)
        if user.check_password(request.data['oldPass']):
            user.set_password(request.data['newPass'])
            user.save()
            print('SAVED!!!')

            return Response({'detail': 'Password has been saved.'})
        else:
            return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)
