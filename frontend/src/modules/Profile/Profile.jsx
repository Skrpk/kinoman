import React from 'react';
import TextFieldGroup from '../../common/components/TextFieldGroup';

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
    }
  }

  render() {
    const { user } = this.props;
    const { showChangePassword } = this.state;

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
              />
              <TextFieldGroup
                label="Enter new password"
                onChange={this.onChange}
                value={this.state.newPassword}
                field="newPassword"
                type="password"
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