import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import './signUpForm.css';

class SignUpPage extends React.PureComponent {
  render() {
    const {
      userSignUpRequest,
      isUserExists,
      errors,
      user
    } = this.props;

    if (user.username) {
      return <Redirect to='/' />
    }

    return (<div className="row">
      <div className="form-wrapper">
        <SignUpForm
          checkUserExists={isUserExists}
          userSignUpRequest={userSignUpRequest}
          errors={errors}
        />
      </div>
    </div>);
  }
}

SignUpPage.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default SignUpPage;