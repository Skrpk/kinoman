import React from 'react';
import { connect } from 'react-redux';

import './style.css';
import { getMovieData } from './actions';
import isEmpty from 'lodash/isEmpty';

class FilmDetail extends React.Component {
  componentDidMount() {
    this.props.getMovieData(this.props.match.params.id);
  }

  renderGenres() {
    const { genres } = this.props.details;
    return genres.map(genre => genre.name).join(', ');
  }

  render() {
    const { details } = this.props;

    return (
      <div className="wrapper">
        <div className="film-details">
          <h2>{details.original_title}</h2>
          <div className="rating">
            <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt="poster"/>
            <div>
              <p><b>Release date:</b> {details.release_date}</p>
              <p><b>Vote average:</b> {details.vote_average}</p>
              <p><b>Vote count:</b> {details.vote_count}</p>
              {
                !isEmpty(details.genres) ?
                  <p><b>Genres:</b> { this.renderGenres() }</p> :
                  null 
              }
              <p><b>Original language:</b> {details.original_language}</p>
              <p><b>Overview:</b> {details.overview}</p>              
              </div>
          </div>
        </div>
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
