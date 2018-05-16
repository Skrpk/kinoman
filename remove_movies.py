import os
import urllib.request
from multiprocessing import Pool
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'diploma.settings')

import django

django.setup()

from catalog.models import Film, Genre

def check_poster_exists(film):
    print('###Checking movie: ', film['title'])
    movie = Film.objects.get_or_create(movie_id=film['movie_id'])[0]
    URL = 'https://api.themoviedb.org/3/find/tt' + str(film['movie_id']) + '?external_source=imdb_id&api_key=9bb5cdd5f05b8e9f529bebf6fdca9852'
    response = urllib.request.urlopen(URL)
    data = json.loads(response.read().decode("utf-8"))
    if not data['movie_results']:
      print('Deleted movie', film['title'])
      delete_movie_from_db(film['movie_id'])

def delete_movie_from_db(movie_id):
    Film.objects.filter(movie_id=movie_id).delete()

def populate():
    films = Film.objects.all().values('movie_id', 'title')
    pool = Pool(2)
    pool.map(check_poster_exists, films)
    # for film in films:
    #   print('###Checking movie: ', film.title)
    #   check_poster_exists(film)


if __name__ == '__main__':
    populate()