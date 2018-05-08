import { connect } from 'react-redux';
import Profile from './Profile';
import { changePasswordRequest } from './actions';

const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
});
const mapDispatchToProps = (dispatch) => ({
  changePasswordRequest: (username, oldPass, newPass) =>
                        dispatch(changePasswordRequest(username, oldPass, newPass)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
