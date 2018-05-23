import { take, call, put, takeEvery, select } from 'redux-saga/effects';

import api from '../api';
import {
  LOAD_RECOMMENDED_FILMS,
} from './constants';
import { setRecommendedFilms } from './actions';

function* getRecommededFilmsRequest({ userId }) {
  try {
    const receivedData = yield call(api.getRecommendations, userId);
    yield put(setRecommendedFilms(receivedData.data));

  } catch (e) {

  }
}

export function* getRecommededFilmsSaga() {
  yield takeEvery(LOAD_RECOMMENDED_FILMS, getRecommededFilmsRequest);
}