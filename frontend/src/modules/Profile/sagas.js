import { take, call, put, takeEvery, select } from 'redux-saga/effects';

import api from '../api';
import { CHANGE_PASSWORD_REQUEST } from './constants';

function* changePasswordRequest({ payload }) {
  try {
    const receivedData = yield call(api.changePassword, payload);
    debugger
  } catch (e) {

  }
}

export function* changePasswordSaga() {
  yield takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordRequest);
}
