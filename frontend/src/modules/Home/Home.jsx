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
    this.props.getMovies(1);
  }

  render() {
    const { genres, movies, moviesCount } = this.props;

    return (
      <div className='home'>
        <Sidebar list={genres} title="Genres" />
        <MovieViewer
          movies={movies}
          moviesCount={moviesCount}
          getMovies={this.props.getMovies}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  genres: state.home.get('genres'),
  movies: state.home.get('movies'),
  moviesCount: state.home.get('moviesCount'),
});

const mapDispatchToProps = (dispatch) => ({
  getGenres: () => dispatch(getGenres()),
  getMovies: (page) => dispatch(getMovies(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
