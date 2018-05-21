import { take, call, put, takeEvery, select } from 'redux-saga/effects';

import api from '../api';
import {
  GET_GENRES,
  SET_GENRES,
  GET_MOVIES,
  SET_MOVIES,
  GET_MOVIES_BY_GENRE
} from './constants';
import {
  getGenreId
} from './selectors';

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

function* getMoviesRequest({ page }) {
  try {
    const genreId = yield select(getGenreId);
    const receivedData = yield call(api.getMovies, page, genreId);

    yield put({
      type: SET_MOVIES,
      payload: receivedData.data
    });
  } catch (e) {

  }
}

export function* getMoviesSaga() {
  yield takeEvery(GET_MOVIES, getMoviesRequest);
}

function* getMoviesByGenreRequest({ payload }) {
  try {
    const response = yield call(api.getMoviesByGenre, payload);
    const result = {
      results: response.data,
      count: response.data.length
    };

    yield put({
      type: SET_MOVIES,
      payload: result
    });
  } catch (error) {

  }
}

export function* getMovisByGenreSaga() {
  yield takeEvery(GET_MOVIES_BY_GENRE, getMoviesByGenreRequest);
}