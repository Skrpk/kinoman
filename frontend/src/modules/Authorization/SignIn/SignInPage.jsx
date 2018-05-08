import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import SignInForm from './SignInForm';

class SignInPage extends React.PureComponent {
  componentWillMount() {
    this.props.clearErrorList();
  }

  render() {
    const {
      signInRequest,
      errors,
      user
    } = this.props;

    if (!isEmpty(user)) {
      return <Redirect to='/' />
    }

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