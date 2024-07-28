import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => (
  <div className="home">
    <h1>Bus Ticket Booking App</h1>
    <Link to="/auth"><button>Get Started</button></Link>
  </div>
);

export default Home;