import {
  LOAD_RECOMMENDED_FILMS,
  SET_RECOMMENDED_FILMS
} from './constants';

export const loadRecommendedFilms = (userId) => ({
  type: LOAD_RECOMMENDED_FILMS,
  userId
});

export const setRecommendedFilms = (payload) => ({
  type: SET_RECOMMENDED_FILMS,
  payload
});
