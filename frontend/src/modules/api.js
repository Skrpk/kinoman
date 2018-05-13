import axios from 'axios';

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

export default {
  signUp,
  signIn,
  checkUserExists,
  changePassword,
  getGenres,
  getMovies
};