import { combineReducers } from 'redux';

import auth from './modules/Authorization/authReducer';
import profile from './modules/Profile/profileReducer';
import home from './modules/Home/homeReducer';

export default combineReducers({
  auth,
  profile,
  home
});
