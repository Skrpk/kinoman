import { connect } from 'react-redux';
import Profile from './Profile';
import {
  changePasswordRequest,
  setNewPassComparisonError
} from './actions';

const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
  errors: state.profile.get('errors'),
});
const mapDispatchToProps = (dispatch) => ({
  changePasswordRequest: (username, oldPass, newPass) =>
                        dispatch(changePasswordRequest(username, oldPass, newPass)),
  setNewPassComparisonError: () => dispatch(setNewPassComparisonError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
