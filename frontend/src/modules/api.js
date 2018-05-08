import axios from 'axios';

const signUp = data =>
  axios.post('http://localhost:8000/api/signup', data);

const checkUserExists = data =>
  axios.post('/api/users/exists', data);

const signIn = data =>
  axios.post('http://localhost:8000/api/signin', data);

export default {
  signUp,
  signIn,
  checkUserExists
};