import { take, call, put, takeEvery, select } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';

import api from '../api';
import constants from './constants';
import authActions from './actions';

function* signUpRequest({ payload }) {
  try {
    const receivedData = yield call(api.signUp, payload);

    yield put(authActions.setSignedUpUser(receivedData.data.token));

  } catch (e) {
    yield put({
      type: constants.AUTH_ERROR,
      payload: e.response.data,
    });
  }
}

export function* signUpSaga() {
  yield takeEvery(constants.SIGN_UP_REQUEST, signUpRequest);
}

function* checkUserExists({ payload }) {
  const auth = yield select(state => state.auth);
  try {
    yield call(api.checkUserExists, payload);

    const newErrorObj = {...auth.get('errors')};
    delete newErrorObj[payload.field];
    yield put({
      type: constants.AUTH_ERROR,
      payload: newErrorObj,
    });
  } catch (error) {
    yield put({
      type: constants.AUTH_ERROR,
      payload: { ...auth.get('errors'), [payload.field]: error.response.data[payload.field] },
    });
  }
}

export function* checkUserExistsSaga() {
  yield takeEvery(constants.IS_USER_EXISTS, checkUserExists);
}

function* signInRequest({ data }) {
  try {
    const user = yield call(api.signIn, {username: data.identifier, password: data.password});
    const { token } = user.data;

    localStorage.setItem('jwtToken', token);
    yield put(authActions.setSignedUpUser(token));
    
  } catch (e) {
    yield put({
      type: constants.AUTH_ERROR,
      payload: e.response.data,
    });
  }
}

export function* signInRequestSaga() {
  yield takeEvery(constants.SIGN_IN_REQUEST, signInRequest);
}