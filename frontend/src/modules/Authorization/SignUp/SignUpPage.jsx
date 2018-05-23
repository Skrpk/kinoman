import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import './signUpForm.css';
import isEmpty from 'lodash/isEmpty';

class SignUpPage extends React.PureComponent {
  render() {
    const {
      userSignUpRequest,
      isUserExists,
      errors,
      user
    } = this.props;

    if (!isEmpty(user)) {
      return <Redirect to='/' />
    }

    return (<div className="sign-up-wrapper">
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