from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework_jwt.settings import api_settings
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import *
from catalog.models import Film, Genre
from django.contrib.auth.models import User

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class FilmViewSet(viewsets.ReadOnlyModelViewSet):
   queryset = Film.objects.all()
   permission_classes = (permissions.AllowAny,)

   def get_serializer_class(self):
       if self.action == 'list':
           return FilmPreviewSerializer
       return FilmDetailSerializer

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
