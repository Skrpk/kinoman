import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import Main from './modules/Main/Main';
import Header from './modules/Main/components/Header/Header';
import axios from 'axios';

class App extends Component {
  // componentDidMount() {
  //   axios.get('api/films').then(response => {
  //     console.log(response)
  //     debugger
  //   })
  // }
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
