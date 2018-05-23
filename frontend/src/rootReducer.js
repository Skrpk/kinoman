import { combineReducers } from 'redux';

import auth from './modules/Authorization/authReducer';
import profile from './modules/Profile/profileReducer';
import home from './modules/Home/homeReducer';
import filmDetails from './modules/FilmDetail/filmDetailReducer';
import recommendations from './modules/Recommendations/recommendationsReducer';

export default combineReducers({
  auth,
  profile,
  home,
  filmDetails,
  recommendations
});
