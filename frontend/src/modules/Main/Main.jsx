import React from 'react';
import PropTyper from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SignInPage from '../Authorization/SignIn';
import SignUpPage from '../Authorization/SignUp';
import authActions from '../Authorization/actions';
import Home from '../Home/Home';

class Main extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.props.setSignedUpUser(token);
    }
  }
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/signin" component={SignInPage} />
        </Switch>    
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setSignedUpUser: token => dispatch(authActions.setSignedUpUser(token)),
});

export default withRouter(connect(null, mapDispatchToProps)(Main));
