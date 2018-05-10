import { combineReducers } from 'redux';

import auth from './modules/Authorization/authReducer';
import profile from './modules/Profile/profileReducer';

export default combineReducers({
  auth,
  profile
});
