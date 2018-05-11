import { Map } from 'immutable';
import isEmpty from 'lodash/isEmpty';

import {
  SET_GENRES,
  SET_MOVIES
} from './constants';

const initialState = Map({
  genres: [],
  movies: []
});

export default(state = initialState, action = {}) => {
  switch (action.type) {
    case SET_GENRES: {
      return state
        .set('genres', action.payload);
    }
    case SET_MOVIES: {
      return state
        .set('movies', action.payload);
    }
    default:
      return state;
  }
};
