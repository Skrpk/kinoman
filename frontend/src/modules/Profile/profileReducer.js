import { Map } from 'immutable';
import isEmpty from 'lodash/isEmpty';

import {
  SET_ERROR,
  SET_NEW_PASS_COMPARISON_ERROR
} from './constants';

const initialState = Map({
  errors: {
    oldPass: '',
    newPass: '',
  },
});

export default(state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ERROR: {
      return state
        .set('errors', action.payload);
    }
    case SET_NEW_PASS_COMPARISON_ERROR: {
      return state
        .set('errors', { newPass: 'Passwords are different', oldPass: '' })
    }
    default:
      return state;
  }
};