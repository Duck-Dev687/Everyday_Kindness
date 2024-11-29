import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img3 from '../../public/images/Frame_1__2_-removebg-preview (1).png';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [myAccountOpen, setMyAccountOpen] = useState(false);

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-container">
          <div
            className="menu-toggle"
            onClick={() => setMenuOpen((prevState) => !prevState)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`navbar-links ${menuOpen ? 'show' : ''}`}>
            <li>
              <Link to="/home" onClick={() => setMenuOpen(false)}>
                <img src={img3} className="navbar-logo" alt="logo" />
              </Link>
            </li>
            <li>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            </li>
            <li>
              <Link to="/library" onClick={() => setMenuOpen(false)}>Kindness Library</Link>
            </li>
            <li>
              <Link to="/mood-boosters" onClick={() => setMenuOpen(false)}>Mood Boosters</Link>
            </li>
            <li>
              <Link to="/suggestions" onClick={() => setMenuOpen(false)}>AI Suggestions</Link>
            </li>
            <li>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up / Log In</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
