import { connect } from 'react-redux';

import SignUpPage from './SignUpPage';
import authActions from '../actions';

const mapStateToProps = store => ({
  errors: store.auth.get('errors'),
});

const mapDispatchToProps = dispatch => ({
  userSignUpRequest: data => dispatch(authActions.signUpRequest(data)),
  isUserExists: data => dispatch(authActions.isUserExists(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);