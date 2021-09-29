import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/auth";

function Navbar() {
  const dispatch = useDispatch();

  // get the user authentication state
  const { isAuthenticated } = useSelector((state) => state.auth);

  // handle logout
  const handleLogout = () => {
    dispatch(logout());
  };

  const guestLinks = (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/register">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/posts">
          Posts
        </Link>
      </li>
      <li className="nav-item">
        <button className="btn btn-outline-dark" onClick={handleLogout}>
          Logout
        </button>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Social Media
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
