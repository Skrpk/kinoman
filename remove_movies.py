import os
import urllib.request
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'diploma.settings')

import django

django.setup()

from catalog.models import Film, Genre

def check_poster_exists(movie_id, title):
    movie = Film.objects.get_or_create(movie_id=movie_id)[0]
    URL = 'https://api.themoviedb.org/3/find/tt' + str(movie_id) + '?external_source=imdb_id&api_key=9bb5cdd5f05b8e9f529bebf6fdca9852'
    response = urllib.request.urlopen(URL)
    data = json.loads(response.read().decode("utf-8"))
    if not data['movie_results']:
      print('Deleted movie', title)
      delete_movie_from_db(movie_id)

def delete_movie_from_db(movie_id):
    Film.objects.filter(movie_id=movie_id).delete()

def populate():
    films = Film.objects.all()
    for film in films:
      print('###Checking movie: ', film.title)
      check_poster_exists(film.movie_id, film.title)


if __name__ == '__main__':
    populate()