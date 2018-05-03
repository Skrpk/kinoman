import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import Main from './modules/Main/Main';
import Header from './modules/Main/components/Header/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
