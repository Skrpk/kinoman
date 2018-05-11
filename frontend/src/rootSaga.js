import { all, fork } from 'redux-saga/effects';

import {
  signUpSaga,
  checkUserExistsSaga,
  signInRequestSaga
} from './modules/Authorization/sagas';
import { changePasswordSaga } from './modules/Profile/sagas';
import { getGenresSaga } from './modules/Home/sagas';

export default function* rootSaga() {
  yield all([
    fork(signUpSaga),
    fork(checkUserExistsSaga),
    fork(signInRequestSaga),
    fork(changePasswordSaga),
    fork(getGenresSaga)
  ]);
}
