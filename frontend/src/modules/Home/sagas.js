import { take, call, put, takeEvery, select } from 'redux-saga/effects';

import api from '../api';
import {
  GET_GENRES,
  SET_GENRES
} from './constants';

function* getGenresRequest({ payload }) {
  try {
    const receivedData = yield call(api.getGenres);

    yield put({
      type: SET_GENRES,
      payload: receivedData.data
    });
  } catch (e) {

  }
}

export function* getGenresSaga() {
  yield takeEvery(GET_GENRES, getGenresRequest);
}
