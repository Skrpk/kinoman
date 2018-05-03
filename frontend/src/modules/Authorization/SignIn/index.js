import { connect } from 'react-redux';

import SignInPage from './SignInPage';
import authActions from '../actions';

const mapStateToProps = state => ({
  errors: state.auth.get('errors'),
});

const mapDispatchToProps = dispatch => ({
  signInRequest: data => dispatch(authActions.signInRequest(data)),
  clearErrorList: () => dispatch(authActions.clearErrorList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);