import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [token, setToken] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(false);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          Logohere
        </Link>
        <ul className="navbar-links">
          {/* <li>
          <Link to="/library">Library</Link>
        </li> */}

          { !token ? (
            <>
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
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}

          <li>
            <Link to="store" className="auth-link">
              MyStore
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
