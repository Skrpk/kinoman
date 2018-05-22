import os
import urllib.request
import django
import datetime
import decimal
from scipy.sparse import coo_matrix
from lightfm import LightFM
from lightfm.evaluation import precision_at_k
from lightfm.evaluation import auc_score
import numpy as np
from lightfm.datasets import fetch_movielens

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'diploma.settings')

import django

django.setup()

from django.contrib.auth.models import User
from api.models import Rating
from catalog.models import Film, Genre

def func():
    ratings = list(Rating.objects.all())
    films = list(Film.objects.all())
    users = list(User.objects.all())

    interactions_matrix = []

    # a = Rating.objects.filter(user_id=1, movie_id='0068646')
    # print(int(a[0].rating))

    for user in users:
        rating_of_user = []
        for film in films:
            rating = Rating.objects.filter(user_id=user.id, movie_id=film.movie_id)
            if rating:
                rating_of_user.append(int(rating[0].rating))
            else:
                rating_of_user.append(0)

        interactions_matrix.append(rating_of_user)

    interactions_matrix = coo_matrix(interactions_matrix)

    model = LightFM(learning_rate=0.02, loss='bpr')
    model.fit(interactions_matrix, epochs=10)
    print(model.predict(np.int32([4, 5, 6]), np.int32([0, 1, 2])))
    # data = [
    #     [2, 5, 3, 0],
    #     [1, 0, 4, 5],
    #     [3, 4, 5, 2],
    #     [1, 2, 3, 4],
    #     [5, 5, 1, 1],
    #     [3, 2, 3, 5],
    #     [2, 3, 1, 4],
    #     [1, 1, 3, 5],
    #     [5, 5, 5, 1],
    #     [4, 3, 3, 2],
    #     [4, 5, 1, 2]
    # ]

    # MATRIX = coo_matrix(data)

    # model = LightFM(learning_rate=0.02, loss='bpr')
    # model.fit(MATRIX, epochs=10)
    # print(model.predict(4, np.int32([0, 1, 2])))


def func1():
    movielens = fetch_movielens()
    train = movielens['train']
    test = movielens['test']

    model = LightFM(learning_rate=0.05, loss='bpr')
    model.fit(train, epochs=10)

    train_precision = precision_at_k(model, train, k=10).mean()
    test_precision = precision_at_k(model, test, k=10).mean()

    train_auc = auc_score(model, train).mean()
    test_auc = auc_score(model, test).mean()

    print('Precision: train %.2f, test %.2f.' % (train_precision, test_precision))
    print('AUC: train %.2f, test %.2f.' % (train_auc, test_auc))
    print(model.predict(5, np.int32[0]))

if __name__ == '__main__':
    func()