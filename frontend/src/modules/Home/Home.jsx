import React from 'react';
import { connect } from 'react-redux';

import Sidebar from './components/Sidebar/index';
import { getGenres } from './actions';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getGenres();
  }

  render() {
    const { genres } = this.props;

    return (
      <div>
        <Sidebar list={genres} title="Genres" />
        <h1>Hello!</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  genres: state.home.get('genres'),
});

const mapDispatchToProps = (dispatch) => ({
  getGenres: () => dispatch(getGenres()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
