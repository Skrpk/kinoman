import {
  CHANGE_PASSWORD_REQUEST
} from './constants';

export const changePasswordRequest = (username, oldPass, newPass) => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload: { username, oldPass, newPass }
});
