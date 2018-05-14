import {
  GET_MOVIE_DATA,
} from './constants';

export const getMovieData = (movieId) => ({
  type: GET_MOVIE_DATA,
  payload: movieId,
});
