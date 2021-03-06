import { Map } from 'immutable';
import isEmpty from 'lodash/isEmpty';

import constants from './constants';

const initialState = Map({
  isAuthenticated: false,
  user: {},
  errors: {},
});

export default(state = initialState, action = {}) => {
  switch (action.type) {
    case constants.SET_SIGNED_UP_USER: {
      return state
        .set('user', action.payload)
        .set('errors', {})
        .set('isAuthenticated', true);
    }
    case constants.AUTH_ERROR: {
      const errors = {
        signin: action.payload.non_field_errors ? action.payload.non_field_errors[0] : {}
      }
      return state
        .set('errors', errors);
    }
    case constants.LOG_OUT: {
      return state
        .set('user', {})
        .set('isAuthenticated', false);
    }
    default:
      return state;
  }
};