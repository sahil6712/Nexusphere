// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; // Import custom CSS for Navbar

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NEXUSPHERE
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/lead">
                Leader Board
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/noticeboard">
                TNP NOTICE
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/privatespace'>Create Exam</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/fetchexam'>Take Exam</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to='/signup'>Signup</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
