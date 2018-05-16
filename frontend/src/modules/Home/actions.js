import {
  GET_GENRES,
  GET_MOVIES,
  GET_MOVIES_BY_GENRE
} from './constants';

export const getGenres = () => ({
  type: GET_GENRES,
});

export const getMovies = (page) => ({
  type: GET_MOVIES,
  payload: page
});

export const getMoviesByGenre = (genreId) => ({
  type: GET_MOVIES_BY_GENRE,
  payload: genreId
});
