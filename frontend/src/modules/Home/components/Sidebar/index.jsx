import React from 'react';
import './style.css';

export default class Sidebar extends React.Component {
  renderList = (list) =>
    list.map(elem =>
      <li className="sidebar-elem" key={Math.random()}>
        <a
          className="list-group-item"
          href="#"
          onClick={() => this.props.onClick(elem.id)}          
        >
          {elem.name}
        </a>
      </li>
    )

  render() {
    const { list, title } = this.props;

    return (
      <div className="col-sm-4 col-md-3 sidebar">
        <h2>{title}</h2>
        <div className="list-group">
          <ul className="sidebar-ul">
            { this.renderList(list) }
          </ul>
        </div>
        
      </div>
    );
  }
}