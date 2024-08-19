// Card.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css'; // Import custom CSS for the Card component

export default function Card({ imgSource, togo, subject }) {
  return (
    <div className="card">
      <img src={imgSource} className="card-img-top" alt={subject} />
      <div className="card-body">
        <h5 className="card-title">{subject}</h5>
        <Link to={togo} className="btn btn-primary">Go to {subject}</Link>
      </div>
    </div>
  );
}
