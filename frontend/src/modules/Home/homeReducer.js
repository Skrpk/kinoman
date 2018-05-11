import { Map } from 'immutable';
import isEmpty from 'lodash/isEmpty';

import {
  SET_GENRES
} from './constants';

const initialState = Map({
  genres: []
});

export default(state = initialState, action = {}) => {
  switch (action.type) {
    case SET_GENRES: {
      return state
        .set('genres', action.payload);
    }
    default:
      return state;
  }
};
