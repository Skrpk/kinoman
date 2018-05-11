import React from 'react';
import { Redirect } from 'react-router-dom';
import TextFieldGroup from '../../common/components/TextFieldGroup';
import isEmpty from 'lodash/isEmpty';

class Profile extends React.PureComponent {
  state = {
    showChangePassword: false,
    oldPassword: '',
    newPassword: '',
    newPasswordCheck: ''
  }

  toggleChangePasswordFlag = () => {
    this.setState({ showChangePassword: !this.state.showChangePassword });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    const { newPassword, newPasswordCheck, oldPassword } = this.state;

    e.preventDefault();
    if (newPassword === newPasswordCheck) {
      this.props.changePasswordRequest(this.props.user.username, oldPassword, newPassword);
    } else {
      this.props.setNewPassComparisonError();
    }
  }

  render() {
    const { user, errors } = this.props;
    const { showChangePassword } = this.state;

    if (isEmpty(user)) {
      return <Redirect to='/' />;
    }

    return (
      <div>
        <h1>Profile page</h1>
        <h5>Username: {user.username}</h5>
        <h5>Email: {user.email}</h5>
        <button
              className="btn btn-primary"
              onClick={this.toggleChangePasswordFlag}
            >
              { showChangePassword ? 'Cancel' : 'Change password' }
            </button>
        {
          showChangePassword ?
            <form>
              <TextFieldGroup
                label="Enter old password"
                onChange={this.onChange}
                value={this.state.oldPassword}
                field="oldPassword"
                type="password"
                error={errors.oldPass}
              />
              <TextFieldGroup
                label="Enter new password"
                onChange={this.onChange}
                value={this.state.newPassword}
                field="newPassword"
                type="password"
                error={errors.newPass}
              />
              <TextFieldGroup
                label="Enter new password again"
                onChange={this.onChange}
                value={this.state.newPasswordCheck}
                field="newPasswordCheck"
                type="password"
              />
              <div className="form-group">
                <button
                  onClick={this.onSubmit}
                  className="btn btn-success btn-lg"
                >
                  Send!
                </button>
              </div>
            </form>
            : null
        }
      </div>
      
    );
  }
}

export default Profile;