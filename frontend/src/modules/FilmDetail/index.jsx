import React from 'react';
import { connect } from 'react-redux';

import './style.css';
import {
  getMovieData,
  rateMovie,
  getMovieRating
} from './actions';
import isEmpty from 'lodash/isEmpty';
import Stars from './components/stars';


const comments = [
  { author: 'vitali skripka', text: 'Awesome, liked it very much!!!', time: '02.03.2016' },
  { author: 'andiy velychko', text: 'So boring!!!', time: '02.05.2015' },
];

class FilmDetail extends React.Component {
  componentDidMount() {
    const { userId, details: { id } } = this.props;

    this.props.getMovieData(this.props.match.params.id);
  }

  renderGenres() {
    const { genres } = this.props.details;
    return genres.map(genre => genre.name).join(', ');
  }

  onRate = (value) => {
    const { userId, details: { id } } = this.props;
    this.props.rateMovie(id, value, userId);
  }

  render() {
    const { details, userId } = this.props;

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
          { userId ?
            <Stars
              onStarClick={this.onRate}
              rating={details.rating}
            /> : null
          }
                 
        </div>
        <div className="comments">
          {
            comments.map((comment, index) => {
              let classBg = '';
              if (index % 2 === 0) {
                classBg = 'grey-bg';
              }
              return (
                <div className={`comment ${classBg}`}>
                  <p><b className="author">{comment.author}</b> at {comment.time}</p>
                  <p>{comment.text}</p>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  details: store.filmDetails.get('details'),
  userId: store.auth.get('user').user_id
});

const mapDispatchToProps = (dispatch) => ({
  getMovieData: (movieId) => dispatch(getMovieData(movieId)),
  rateMovie: (movieId, value, userId) => dispatch(rateMovie(movieId, value, userId)),
  getMovieRating: (movieId, userId) => dispatch(getMovieRating(movieId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmDetail);
