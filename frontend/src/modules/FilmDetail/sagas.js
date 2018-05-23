import { take, call, put, takeEvery, select } from 'redux-saga/effects';

import api from '../api';
import {
  GET_MOVIE_DATA,
  SET_MOVIE_DETAIL,
  RATE_MOVIE,
  GET_MOVIE_RATING,
  SET_MOVIE_RATING
} from './constants';
import { getUserId } from './selectors';

function* getMovieDetailsRequest({ payload }) {
  try {
    const receivedData = yield call(api.getMovieDetail, payload);
    const { data: { genres } } = yield call(api.getGenresFromMovieDB);

    const detailData = receivedData.data.movie_results[0];

    const userId = yield select(getUserId);

    if (userId >= 0) {
      const rating = yield call(api.getMovieRating, detailData.id, userId);
      detailData.rating = Number(rating.data.rating);
    }

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

function* rateMovieRequest({ payload, movieId, userId }) {
  try {
    const receivedData = yield call(api.rateMovie, movieId, payload, userId);
  } catch (e) {

  }
}

export function* rateMovieSaga() {
  yield takeEvery(RATE_MOVIE, rateMovieRequest);
}

function* getRatingRequest({ movieId, userId }) {
  try {
    const receivedData = yield call(api.getMovieRating, movieId, userId);
    debugger
  } catch (e) {

  }
}

export function* getRatingSaga() {
  yield takeEvery(GET_MOVIE_RATING, getRatingRequest);
}