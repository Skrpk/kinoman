import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isAuthenticated, logoutHandler }) => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="nav-header">
          <Link to="/" className="navbar-brand">Main page</Link>

          <div className="collapse navbar-collapse">
            { isAuthenticated ?
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/profile">Profile</Link></li>
                <li>
                  <button
                    className="logout-button"
                    onClick={logoutHandler}
                  >Log out</button>
                </li>
              </ul> :
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/signin">Login</Link></li>
              </ul>
          }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
