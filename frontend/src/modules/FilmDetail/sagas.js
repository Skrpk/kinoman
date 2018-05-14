import { take, call, put, takeEvery, select } from 'redux-saga/effects';

import api from '../api';
import {
  GET_MOVIE_DATA,
  SET_MOVIE_DETAIL
} from './constants';

function* getMovieDetailsRequest({ payload }) {
  try {
    const receivedData = yield call(api.getMovieDetail, payload);

    yield put({
      type: SET_MOVIE_DETAIL,
      payload: receivedData.data.movie_results[0]
    });
  } catch (e) {

  }
}

export function* getMovieDetailsSaga() {
  yield takeEvery(GET_MOVIE_DATA, getMovieDetailsRequest);
}
