import { take, call, put, takeEvery, select } from 'redux-saga/effects';

import api from '../api';
import {
  GET_MOVIE_DATA,
  SET_MOVIE_DETAIL
} from './constants';

function* getMovieDetailsRequest({ payload }) {
  try {    
    const receivedData = yield call(api.getMovieDetail, payload);
    const { data: { genres } } = yield call(api.getGenresFromMovieDB);
    
    const detailData = receivedData.data.movie_results[0];
    detailData.genres = genres.filter(genre => detailData.genre_ids.indexOf(genre.id) > 0);
    yield put({
      type: SET_MOVIE_DETAIL,
      payload: detailData
    });
  } catch (e) {

  }
}

export function* getMovieDetailsSaga() {
  yield takeEvery(GET_MOVIE_DATA, getMovieDetailsRequest);
}
