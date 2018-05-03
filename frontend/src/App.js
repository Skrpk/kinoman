import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import Main from './modules/Main/Main';

class App extends Component {
  render() {
    return (
      <Main />
    );
  }
}

export default App;
