import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import validateInput from '../../../common/validations/SignUp';
import TextFieldGroup from '../../../common/components/TextFieldGroup';

class SignUpForm extends React.PureComponent {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {},
    isLoading: false,
    isValid: !isEmpty(this.props.errors),
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  checkUserExists = (e) => {
    const field = e.target.name;
    const val = e.target.value;

    if (val) {
      this.props.checkUserExists({ field, val });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: nextProps.errors,
      isValid: !isEmpty(nextProps.errors),
    });
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
      this.props.userSignUpRequest(this.state);
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="bd-example">
        <h1>What`s up</h1>
        <form>
          <TextFieldGroup
            error={errors.username}
            label="Username"
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
            value={this.state.username}
            field="username"
          />
          <TextFieldGroup
            error={errors.email}
            label="Email"
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
            value={this.state.email}
            field="email"
          />
          <TextFieldGroup
            error={errors.password}
            label="Password"
            onChange={this.onChange}
            value={this.state.password}
            field="password"
            type="password"
          />
          <TextFieldGroup
            error={errors.passwordConfirmation}
            label="Password Confirmation"
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            field="passwordConfirmation"
            type="password"
          />
          <div className="form-group">
            <button
              onClick={this.onSubmit}
              disabled={this.state.isLoading || this.state.isValid}
              className="btn btn-primary btn-lg"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
SignUpForm.propTypes = {
  errors: PropTypes.object.isRequired,
  checkUserExists: PropTypes.func.isRequired,
  userSignUpRequest: PropTypes.func.isRequired,
}
export default SignUpForm;