import React from 'react';
import axios from 'axios';

import './style.css';
import apiKey from '../../../../common/apiKey.js';

class MoviePresenter extends React.Component {
  state = {
    imageUrl: '',
  }

  componentDidMount() {
    const url = `https://api.themoviedb.org/3/find/tt${this.props.movie.movie_id}?external_source=imdb_id&api_key=${apiKey}`;
    axios.get(url)
         .then(response => {
           const { movie_results } = response.data;
           const posterPath = movie_results[0] ? movie_results[0].poster_path : '';
           this.setState({ imageUrl: posterPath });
         })
  }

  render() {
    const { imageUrl } = this.state;

    return (
      <div className="movie-presenter-wrapper">
      <div className='movie-presenter'>
        <img src={`https://image.tmdb.org/t/p/w500${imageUrl}`} width="195px" height="290px"/>
        <p>{this.props.movie.title}</p>
      </div>
      </div>
  );
  }
}

export default MoviePresenter;
