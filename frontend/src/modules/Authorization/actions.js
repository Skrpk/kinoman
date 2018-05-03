import constants from './constants';

const signUpRequest = data => ({
  type: constants.SIGN_UP_REQUEST,
  payload: data,
});

const isUserExists = data => ({
  type: constants.IS_USER_EXISTS,
  payload: data,
});

const signInRequest = data => ({
  type: constants.SIGN_IN_REQUEST,
  data,
});

const clearErrorList = () => ({
  type: constants.AUTH_ERROR,
  payload: {},
});

export default {
  signUpRequest,
  isUserExists,
  signInRequest,
  clearErrorList,
};