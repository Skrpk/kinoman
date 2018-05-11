import React from 'react';
import { connect } from 'react-redux';

import './style.css';
import Sidebar from './components/Sidebar/index';
import {
  getGenres,
  getMovies
} from './actions';
import MovieViewer from './components/MoviesViewer/index';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getGenres();
    this.props.getMovies();
  }

  render() {
    const { genres, movies } = this.props;

    return (
      <div className='home'>
        <Sidebar list={genres} title="Genres" />
        <MovieViewer movies={movies} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  genres: state.home.get('genres'),
  movies: state.home.get('movies')
});

const mapDispatchToProps = (dispatch) => ({
  getGenres: () => dispatch(getGenres()),
  getMovies: () => dispatch(getMovies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
