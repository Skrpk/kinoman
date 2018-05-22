import os
import urllib.request
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'diploma.settings')

import django

django.setup()

from catalog.models import Film, Genre


def create_movie(movie_id, title, genres, index):
    # URL = 'https://api.themoviedb.org/3/find/tt' + movie_id + '?external_source=imdb_id&api_key=9bb5cdd5f05b8e9f529bebf6fdca9852'
    # response = urllib.request.urlopen(URL)
    # data = json.loads(response.read().decode("utf-8"))
    # if data['movie_results']:
    movie = Film.objects.get_or_create(movie_id=movie_id)[0]

    title_and_year = title.split(sep="(")

    movie.title = title_and_year[0]
    movie.year = title_and_year[1][:-1]
    movie.index = index

    if genres:
        for genre in genres.split(sep="|"):
            g = Genre.objects.get_or_create(name=genre)[0]
            movie.genres.add(g)
            g.save()

    movie.save()

    return movie


def download_movies():
    # URL = 'https://raw.githubusercontent.com/sidooms/MovieTweetings/master/latest/movies.dat'
    # response = urllib.request.urlopen(URL)
    # data = response.read()
    # return data.decode('utf-8')

    file = open("films.txt", "r")
    return file.read()

def delete_db():
    print('truncate db')
    Film.objects.all().delete()
    Genre.objects.all().delete()
    print('finished truncate db')

def populate():

    movies = download_movies()

    print('movie data downloaded')

    for (index, movie) in enumerate(movies.split(sep="\n")):
        m = movie.split(sep="::")
        if len(m) == 3:

            create_movie(m[0], m[1], m[2], index)



if __name__ == '__main__':
    print("Starting Kinoman Population script...")
    # movies = download_movies().split('\n')
    # for movie in movies:
    #     print(movie)
    delete_db()
    populate()