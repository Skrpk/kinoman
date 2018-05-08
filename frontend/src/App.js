import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import Main from './modules/Main/Main';
import Header from './modules/Main/components/Header/Header';
import authActions from './modules/Authorization/actions';

class App extends Component {
  logOut = () => {
    localStorage.removeItem('jwtToken');
    this.props.logOut();
  }
  render() {
    return (
      <div>
        <Header
          isAuthenticated={this.props.isAuthenticated}
          logoutHandler={this.logOut}
        />
        <Main />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(authActions.logOut()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
