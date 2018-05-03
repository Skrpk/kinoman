import React from 'react';
import PropTypes from 'prop-types';

import SignUpForm from './SignUpForm';
import './signUpForm.css';

class SignUpPage extends React.PureComponent {
  render() {
    const {
      userSignUpRequest,
      isUserExists,
      errors,
    } = this.props;

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