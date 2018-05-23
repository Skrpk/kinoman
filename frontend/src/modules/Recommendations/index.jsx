import React from 'react';
import { connect } from 'react-redux';
import { loadRecommendedFilms } from './actions';
import MoviePresenter from '../Home/components/MoviePresenter';

import './style.css';

class RecommendationsPage extends React.Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.loadRecommendedFilms(this.props.userId)
    }
  }

  renderFIlms = (films) =>
    films.map(film => <MoviePresenter key={film.movie_id} movie={film} />) 

  render() {
    const { films } = this.props;
    return (
      <div className="recommendations-wrapper">
        <h2>Personal recommendations are provided here</h2>
        <div>
          { this.renderFIlms(films) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.get('user').user_id,
  films: state.recommendations.get('films')
});

const mapDispatchToProps = dispatch => ({
  loadRecommendedFilms: (userId) => dispatch(loadRecommendedFilms(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationsPage);
