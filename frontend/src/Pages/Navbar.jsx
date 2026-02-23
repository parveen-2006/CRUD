import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Logohere
      </Link>
      <ul className="navbar-links">
        <li>
          <Link to="/library">Library</Link>
        </li>
        <li>
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="auth-link">
            Register
          </Link>
        </li>
        <li>
          <Link to="store" className="auth-link">
            MyStore
          </Link>
        </li>
      </ul>
    </nav>
  );
}
