import {
  GET_MOVIE_DATA,
  RATE_MOVIE,
  GET_MOVIE_RATING
} from './constants';

export const getMovieData = (movieId) => ({
  type: GET_MOVIE_DATA,
  payload: movieId,
});

export const getMovieRating = (movieId, userId) => ({
  type: GET_MOVIE_RATING,
  movieId,
  userId
});

export const rateMovie = (movieId, value, userId) => ({
  type: RATE_MOVIE,
  payload: value,
  movieId,
  userId
});
