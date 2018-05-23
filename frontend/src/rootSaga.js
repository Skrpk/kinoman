import { all, fork } from 'redux-saga/effects';

import {
  signUpSaga,
  checkUserExistsSaga,
  signInRequestSaga
} from './modules/Authorization/sagas';
import { changePasswordSaga } from './modules/Profile/sagas';
import {
  getGenresSaga,
  getMoviesSaga,
  getMovisByGenreSaga
} from './modules/Home/sagas';
import { getMovieDetailsSaga } from './modules/FilmDetail/sagas';
import { getRecommededFilmsSaga } from './modules/Recommendations/sagas';

export default function* rootSaga() {
  yield all([
    fork(signUpSaga),
    fork(checkUserExistsSaga),
    fork(signInRequestSaga),
    fork(changePasswordSaga),
    fork(getGenresSaga),
    fork(getMoviesSaga),
    fork(getMovieDetailsSaga),
    fork(getMovisByGenreSaga),
    fork(getRecommededFilmsSaga),
  ]);
}
