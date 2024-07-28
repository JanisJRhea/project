import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const BusList = ({ buses, token }) => (
    <div className="bus-list">
        {buses.map((bus) => (
            <div key={bus.id}>
                <p>{bus.from} to {bus.to} on {new Date(bus.date).toLocaleDateString()}</p>
                <Link to={`/booking/${bus.id}`}>
                    <button>Book Now</button>
                </Link>
            </div>
        ))}
    </div>
);

export default BusList;