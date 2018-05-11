import {
  GET_GENRES,
  GET_MOVIES
} from './constants';

export const getGenres = () => ({
  type: GET_GENRES,
});

export const getMovies = () => ({
  type: GET_MOVIES,
});
