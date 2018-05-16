import { Map } from 'immutable';
import isEmpty from 'lodash/isEmpty';

import {
  SET_GENRES,
  SET_MOVIES,
  SET_GENRE_ID
} from './constants';

const initialState = Map({
  genres: [],
  movies: [],
  moviesCount: 0,
  currentGenreId: 0
});

export default(state = initialState, action = {}) => {
  switch (action.type) {
    case SET_GENRES: {
      return state
        .set('genres', action.payload);
    }
    case SET_MOVIES: {
      return state
        .set('movies', action.payload.results)
        .set('moviesCount', action.payload.count);
    }
    case SET_GENRE_ID: {
      return state
        .set('currentGenreId', action.payload)
    }
    default:
      return state;
  }
};
