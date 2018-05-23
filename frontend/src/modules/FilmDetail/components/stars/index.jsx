import React from 'react';

import './style.css';

class Stars extends React.Component {
  state = {
    value: 0,
    block: false
  }

  onHover = (elem) => {
    if (this.state.block) {
      return;
    }
    this.setState({ value: elem.target.value})
  }

  onStarClick = () => {
    if (this.state.block) {
      return;
    }

    this.setState({ block: true });
    this.props.onStarClick(this.state.value);
  }

  renderStars = () => {
    const stars = [];
    const { value } = this.state;

    for(let i = 0; i < 10; i++) {
      let className = '';
      if (i < value) {
        className = 'hovered';
      } else {
        className = 'unhovered';
      }

      stars.push(
        <li
          key={i+1}
          value={i+1}
          onMouseOver={this.onHover}
          onMouseLeave={() => this.setState({ value: 0 })}
          onClick={this.onStarClick}
          className={"star " + className}>
            {i+1}
        </li>
      );
    }

    return stars;
  }

  render() {
    return (
      <div>
        <ul>
          { this.renderStars() }
        </ul>
      </div>
    );
  }
}

export default Stars;
