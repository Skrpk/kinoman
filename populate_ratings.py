import os
import urllib.request
import django
import datetime
import decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'diploma.settings')

django.setup()

from django.contrib.auth.models import User
from api.models import Rating


def create_rating(user_id, content_id, rating, timestamp):

    create_user(user_id)
    rating = Rating(user_id=user_id, movie_id=content_id, rating=decimal.Decimal(rating),
                    rating_timestamp=datetime.datetime.fromtimestamp(float(timestamp)))
    rating.save()

    return rating

def create_user(user_id):
    user, created = User.objects.get_or_create(
        id=user_id, 
        username='user' + str(user_id),
        email='jlennon' + str(user_id) + '@beatles.com'
    )

    user.set_password('qwertyui')
    user.save()

def download_ratings():
    URL = 'https://raw.githubusercontent.com/sidooms/MovieTweetings/master/latest/ratings.dat'
    response = urllib.request.urlopen(URL)
    data = response.read()

    print('download finished')
    return data.decode('utf-8')

def delete_db():
    print('truncate db')
    Rating.objects.all().delete()
    User.objects.all().delete()
    print('finished truncate db')

def populate():

    delete_db()

    ratings = download_ratings()

    count = 0
    for rating in ratings.split(sep="\n"):
        r = rating.split(sep="::")
        if len(r) == 4:
            create_rating(r[0], r[1], r[2], r[3])
        if count > 500:
            print('.')
            count = 0
        else:
            count += 1

if __name__ == '__main__':
    print("Starting MovieGeeks Population script...")
    populate()