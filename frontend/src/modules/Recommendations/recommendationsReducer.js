import { Map, List } from 'immutable';
import isEmpty from 'lodash/isEmpty';

import {
  SET_RECOMMENDED_FILMS
} from './constants';

const initialState = Map({
  films: List()
});

export default(state = initialState, action = {}) => {
  switch (action.type) {
    case SET_RECOMMENDED_FILMS: {
      return state
        .set('films', action.payload)
    }
    default:
      return state;
  }
};
