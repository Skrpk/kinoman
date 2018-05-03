import { combineReducers } from 'redux';

import auth from './modules/Authorization/authReducer';

export default combineReducers({
  auth
});
