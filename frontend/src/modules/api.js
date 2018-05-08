import axios from 'axios';

const signUp = data =>
  axios.post('http://localhost:8000/api/signup', data);

const checkUserExists = data =>
  axios.post('/api/users/exists', data);

const signIn = data =>
  axios.post('http://localhost:8000/api/signin', data);

const changePassword = data => {
  const authToken = localStorage.getItem('jwtToken');
  // axios.defaults.headers.common['Authorization'] = `JWT ${authToken}`;
  return axios.post(
    'http://localhost:8000/api/change_password',
    data,
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
  changePassword
};