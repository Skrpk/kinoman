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
from rest_framework import generics
import json

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class FilmViewSet(generics.ListAPIView):
    queryset = Film.objects.all()
    permission_classes = (permissions.AllowAny,)
    pagination_class = GetPageNumberPagination
    serializer_class = FilmPreviewSerializer

    def get_queryset(self, id):
        if id:
            return Film.objects.filter(genres=id)
        else:
            return Film.objects.all()

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

class getMoviesByGenre(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    pagination_class = GetPageNumberPagination
    serializer_class = FilmPreviewSerializer

    def get_queryset(self, id):
        return Film.objects.filter(genres=id)

    def list(self, request, id):
        queryset = self.filter_queryset(self.get_queryset(id))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get(self, request, id):
        return self.list(request, id)
        # movies = Film.objects.filter(genres=id)
        # return Response(movies.values())

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
