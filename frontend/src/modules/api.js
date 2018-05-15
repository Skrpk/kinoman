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

const getGenres = () =>
  axios.get('/api/genres');

const getMovies = (page) =>
  axios.get(`/api/films/?page=${page}`);

const getMovieDetail = (movieId) =>
  axios.get(`https://api.themoviedb.org/3/find/tt${movieId}?external_source=imdb_id&api_key=${apiKey}`)

const getGenresFromMovieDB = () =>
  axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)

export default {
  signUp,
  signIn,
  checkUserExists,
  changePassword,
  getGenres,
  getMovies,
  getMovieDetail,
  getGenresFromMovieDB
};