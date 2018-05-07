from rest_framework.routers import DefaultRouter
from django.conf.urls import url
from django.urls import path
from .views import *


router = DefaultRouter()
router.register(r'films', FilmViewSet)

urlpatterns = router.urls
urlpatterns += [
  path('signup', UserCreate.as_view()),
]