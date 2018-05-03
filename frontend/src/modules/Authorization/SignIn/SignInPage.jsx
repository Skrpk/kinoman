import React from 'react';
import PropTypes from 'prop-types';

import SignInForm from './SignInForm';

class SignInPage extends React.Component {
  componentWillMount() {
    this.props.clearErrorList();
  }

  render() {
    const {
      signInRequest,
      errors,
    } = this.props;

    return (
      <div className="row">
        <div className="form-wrapper">
          <SignInForm
            signInRequest={signInRequest}
            errors={errors}
          />
        </div>
      </div>
    );
  }
}

SignInPage.propTypes = {
  signInRequest: PropTypes.func.isRequired,
  clearErrorList: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default SignInPage;