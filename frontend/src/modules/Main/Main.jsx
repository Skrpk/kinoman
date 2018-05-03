import React from 'react';
import PropTyper from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import SignInPage from '../Authorization/SignIn';
import SignUpPage from '../Authorization/SignUp';
import Home from '../Home/Home';

class Main extends React.Component {
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

export default Main;
