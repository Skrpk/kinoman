import React from 'react';
import PropTyper from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SignInPage from '../Authorization/SignIn';
import SignUpPage from '../Authorization/SignUp';
import authActions from '../Authorization/actions';
import Home from '../Home/Home';
import Profile from '../Profile';
import FilmDetail from '../FilmDetail';
import RecommendationsPage from '../Recommendations';
import authHOC from '../../common/HOCs/authHOC';

import {
  getGenres,
  getMovies
} from '../Home/actions';

class Main extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.props.setSignedUpUser(token);
    }

    this.props.getGenres();
    this.props.getMovies(1);
  }
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/film-details/:id" component={FilmDetail} />
          <Route path="/profile" component={authHOC(Profile)} />
          <Route path="/recommendations" component={authHOC(RecommendationsPage)} />
        </Switch>
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setSignedUpUser: token => dispatch(authActions.setSignedUpUser(token)),
  getGenres: () => dispatch(getGenres()),
  getMovies: (page) => dispatch(getMovies(page)),
});

export default withRouter(connect(null, mapDispatchToProps)(Main));
