from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import *
from catalog.models import Film
from django.contrib.auth.models import User

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
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)