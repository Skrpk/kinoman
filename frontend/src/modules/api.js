import axios from 'axios';

const signUp = data =>
  axios.post('http://localhost:8000/api/signup', data);

const checkUserExists = data =>
  axios.post('/api/users/exists', data);

export default {
  signUp,
  checkUserExists
};