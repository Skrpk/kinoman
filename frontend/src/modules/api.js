import axios from 'axios';

import apiKey from '../common/apiKey';

const signUp = data =>
  axios.post('http://localhost:8000/api/signup', data);

const checkUserExists = data =>
  axios.post('/api/users/exists', data);

const signIn = data =>
  axios.post('http://localhost:8000/api/signin', data);

const changePassword = data => {
  const authToken = localStorage.getItem('jwtToken');
  return axios.post(
    '/api/change_password',
    data,
    {
      headers: {
        'Authorization': `JWT ${authToken}`
      }
    }
  );
}

const getRecommendations = (id) => {
  const authToken = localStorage.getItem('jwtToken');
  return axios.get(
    `/api/recommendations/id=${id}`,
    {
      headers: {
        'Authorization': `JWT ${authToken}`
      }
    }
  )
}

const getGenres = () =>
  axios.get('/api/genres');

const getMovies = (page, genre) =>
  axios.get(`http://localhost:8000/api/films/?page=${page}${genre ? `&genre=${genre}` : ''}`);

const getMovieDetail = (movieId) =>
  axios.get(`https://api.themoviedb.org/3/find/tt${movieId}?external_source=imdb_id&api_key=${apiKey}`)

const getGenresFromMovieDB = () =>
  axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)

const getMoviesByGenre = (genreId) =>
  axios.get(`/api/films-by-genre/${genreId}`)

const rateMovie = (movieId, rating, userId) => {
  const authToken = localStorage.getItem('jwtToken');
  return axios.post(
    '/api/rate-movie',
    {
      movieId,
      userId,
      rating
    },
    {
      headers: {
        'Authorization': `JWT ${authToken}`
      }
    }
  )
}

const getMovieRating = (movieId, userId) => {
  const authToken = localStorage.getItem('jwtToken');
  return axios.get(
    `/api/get-rating/${movieId}/${userId}`,
    {
      headers: {
        'Authorization': `JWT ${authToken}`
      }
    }
  );
}

export default {
  signUp,
  signIn,
  checkUserExists,
  changePassword,
  getGenres,
  getMovies,
  getMovieDetail,
  getGenresFromMovieDB,
  getMoviesByGenre,
  getRecommendations,
  rateMovie,
  getMovieRating
};