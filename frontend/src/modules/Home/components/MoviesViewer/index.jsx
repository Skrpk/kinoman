import React from 'react';
import ReactPaginate from 'react-paginate';

import MoviePresenter from '../MoviePresenter/index';
import './style.css';

class MovieViewer extends React.Component {
  renderMovies = (movieList) =>
    movieList && movieList.map(movie => <MoviePresenter key={movie.movie_id} movie={movie} />)
  render() {
    const { movies, moviesCount } = this.props;

    const pageCount = Math.round(moviesCount / 12) + 1;

    return (
      <div className='movie-viewer-wrapper'>
        <div>
          { this.renderMovies(movies) }
        </div>
        <div className="pagination-wrapper">
          <div className="paginatio-block">
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={<a href="">...</a>}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={({ selected }) => this.props.getMovies(selected + 1)}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieViewer;
