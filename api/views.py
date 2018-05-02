from rest_framework import viewsets
from .serializers import *
from catalog.models import Film

class FilmViewSet(viewsets.ReadOnlyModelViewSet):
   queryset = Film.objects.all()

   def get_serializer_class(self):
       if self.action == 'list':
           return FilmPreviewSerializer
       return FilmDetailSerializer