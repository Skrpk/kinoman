import React from 'react';
import { Redirect } from 'react-router-dom';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    render() {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        return <Redirect to='/' />;
      }
      return (
        <ComposedComponent { ...this.props } />
      );
    }
  }

  return Authenticate;
}