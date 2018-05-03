import { take, call, put, takeEvery, select } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';

import api from '../api/auth';
import userApi from '../api/user';
import constants from '../constants/authConstants';
import flashConstats from '../constants/FlashMessages'
import setAuthorizationToken from '../utils/setAuthorizationToken';

function* signUpRequest({ payload }) {
  try {
    const receivedData = yield call(api.signUp, payload);

    yield put({
      type: flashConstats.ADD_FLASH_MESSAGE,
      message: {
        type: 'success',
        text: 'Check your email to finish registration.',
      },
    });

    console.log(2);
    browserHistory.push('/');
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
    yield call(userApi.checkUserExists, payload);

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
    const user = yield call(api.signIn, data);
    const { token } = user.data;

    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    yield put({
      type: constants.SET_SIGNED_UP_USER,
      payload: jwtDecode(token),
    });
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