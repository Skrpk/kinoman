import React from 'react';
import './style.css';

export default function(props) {
  return (
    <div className='movie-presenter'>
      <img src='http://gidonline.in/img/ca53b6674_120x170.jpg' width="100%"/>
      <p>{props.name}</p>
    </div>
  );
}
