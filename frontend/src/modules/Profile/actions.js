import {
  CHANGE_PASSWORD_REQUEST,
  SET_NEW_PASS_COMPARISON_ERROR
} from './constants';

export const changePasswordRequest = (username, oldPass, newPass) => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload: { username, oldPass, newPass }
});

export const setNewPassComparisonError = () => ({
  type: SET_NEW_PASS_COMPARISON_ERROR,
});
