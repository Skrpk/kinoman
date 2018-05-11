import React from 'react';

import MoviePresenter from '../MoviePresenter/index';
import './style.css';

class MovieViewer extends React.Component {
  renderMovies = (movieList) =>
    movieList && movieList.map(movie => <MoviePresenter key={movie.id} name={movie.title} />)
  render() {
    const { movies } = this.props;

    return (
      <div className='movie-viewer-wrapper'>
        { this.renderMovies(movies) }
      </div>
    );
  }
}

export default MovieViewer;
