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

from catalog.models import Film, Genre

def func():
    data = [
        [2, 5, 3, 0],
        [1, 0, 4, 5],
        [3, 4, 5, 2],
        [1, 2, 3, 4],
        [5, 5, 1, 1],
        [3, 2, 3, 5],
        [2, 3, 1, 4],
        [1, 1, 3, 5],
        [5, 5, 5, 1],
        [4, 3, 3, 2],
        [4, 5, 1, 2]
    ]

    MATRIX = coo_matrix(data)

    model = LightFM(learning_rate=0.02, loss='bpr')
    model.fit(MATRIX, epochs=10)
    print(model.predict(4, np.int32([0, 1, 2])))

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
    # print("Starting Kinoman Population script...")
    # delete_db()
    # populate()
    func()