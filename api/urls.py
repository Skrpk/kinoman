from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views as vw
from rest_framework_jwt.views import obtain_jwt_token
from django.conf.urls import url
from django.urls import path
from .views import *


router = DefaultRouter()
#router.register(r'films', FilmViewSet)
router.register(r'genres', GenresViewSet)

urlpatterns = router.urls
urlpatterns += [
  path('signup', UserCreate.as_view()),
  path('change_password', ChangePassword.as_view()),
  path('signin', obtain_jwt_token),
  path('films-by-genre/<id>/', getMoviesByGenre.as_view()),
  path('films/', FilmViewSet.as_view())
]