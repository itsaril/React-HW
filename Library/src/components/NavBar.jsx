import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/App.css';

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        📚 Library App
      </Link>
      <div className="nav-links">
        <Link to="/items" className="nav-link">
          Book List
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;