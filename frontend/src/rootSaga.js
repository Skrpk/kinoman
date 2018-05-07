import { all, fork } from 'redux-saga/effects';

import {
  signUpSaga,
  checkUserExistsSaga,
  signInRequestSaga
} from './modules/Authorization/sagas';

export default function* rootSaga() {
  yield all([
    fork(signUpSaga),
    fork(checkUserExistsSaga),
    fork(signInRequestSaga)
  ]);
}
