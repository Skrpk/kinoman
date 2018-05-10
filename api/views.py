from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework_jwt.settings import api_settings
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import *
from catalog.models import Film
from django.contrib.auth.models import User

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class FilmViewSet(viewsets.ReadOnlyModelViewSet):
   queryset = Film.objects.all()

   def get_serializer_class(self):
       if self.action == 'list':
           return FilmPreviewSerializer
       return FilmDetailSerializer

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
        return Response('hello bitch')
        print('*********************************************')
        print(request)
        print(request.user)
        print('*********************************************')
        user = get_object_or_404(User, username=request.user)
        user.set_password(request.POST.get('new_password'))
        user.save()

        return Response({'detail': 'Password has been saved.'})
