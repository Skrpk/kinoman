import { Map } from 'immutable';
import isEmpty from 'lodash/isEmpty';

import {
  SET_MOVIE_DETAIL
} from './constants';

const initialState = Map({
  details: {},
});

export default(state = initialState, action = {}) => {
  switch (action.type) {
    case SET_MOVIE_DETAIL: {
      return state
        .set('details', action.payload);
    }
    default:
      return state;
  }
};
