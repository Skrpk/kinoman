import {
  GET_GENRES,
  GET_MOVIES,
  GET_MOVIES_BY_GENRE,
  SET_GENRE_ID
} from './constants';

export const getGenres = () => ({
  type: GET_GENRES,
});

export const getMovies = (page, genreId) => ({
  type: GET_MOVIES,
  page,
  genreId
});

export const getMoviesByGenre = (genreId) => ({
  type: GET_MOVIES_BY_GENRE,
  payload: genreId
});

export const setGenre = (genreId) => ({
  type: SET_GENRE_ID,
  payload: genreId
});