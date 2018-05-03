import React from 'react';
import PropTypes from 'prop-types';

import TextFieldGroup from '../../../common/components/TextFieldGroup';
import validateInput from '../../../common/validations/SignIn';

export default class SignInForm extends React.Component {
  state = {
    identifier: '',
    password: '',
    errors: {},
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.props.signInRequest(this.state);
    }
  }

  render() {
    const { errors } = this.props;

    return (<div className="bd-example">
      <h1>Sign in!</h1>
      {
        errors.signin ?
        <div className="alert alert-danger">
          {errors.signin}
        </div> : null
      }
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          error={this.state.errors.identifier}
          label="Username or email"
          onChange={this.onChange}
          value={this.state.identifier}
          field="identifier"
        />
        <TextFieldGroup
          error={this.state.errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />
        <button
          className="btn btn-primary btn-lg"
        >Sign In</button>
      </form>
    </div>);
  }
}

SignInForm.propTypes = {
  signInRequest: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};