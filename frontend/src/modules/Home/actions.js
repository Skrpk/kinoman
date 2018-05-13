import {
  GET_GENRES,
  GET_MOVIES
} from './constants';

export const getGenres = () => ({
  type: GET_GENRES,
});

export const getMovies = (page) => ({
  type: GET_MOVIES,
  payload: page
});
