import React from 'react';
import { connect } from 'react-redux';

import { getMovieData } from './actions';

class FilmDetail extends React.Component {
  componentDidMount() {
    this.props.getMovieData(this.props.match.params.id);
  }
  render() {
    const { details } = this.props;

    return (
      <div>
        <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt="poster"/>
        <div><p>{details.original_title}</p></div>
        <div><p>{details.overview}</p></div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  details: store.filmDetails.get('details'),
});

const mapDispatchToProps = (dispatch) => ({
  getMovieData: (movieId) => dispatch(getMovieData(movieId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmDetail);
