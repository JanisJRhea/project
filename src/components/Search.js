import React, { useState } from 'react';
import axios from 'axios';
import BusList from './BusLists';
import './search.css';

const Search = ({ token }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [buses, setBuses] = useState([]);
    const [error, setError] = useState('');
    const [showFromDropdown, setShowFromDropdown] = useState(false);
    const [showToDropdown, setShowToDropdown] = useState(false);

    const places = [
        'Chennai', 'Coimbatore', 'Trichy', 'Madurai', 'Tirunelveli',
        'Salem', 'Erode', 'Kanyakumari', 'Hosur', 'Ramanathapuram', 'Tiruchendur','Ooty','Kodaikanal'
    ];

    const handleSearch = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/search`, {
                params: { from, to, date },
                headers: { Authorization: `Bearer ${token}` },
            });
            setBuses(res.data);
            setError('');
        } catch (error) {
            console.error(error);
            setError('An error occurred while searching for buses.');
        }
    };

    return (
        <div className="search">
            <h1>Travel with a smile</h1>
            <h3>Book your tickets now!</h3>
            <div className="input-container">
                <input
                    type="text"
                    value={from}
                    onClick={() => setShowFromDropdown(!showFromDropdown)}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="From"
                />
                {showFromDropdown && (
                    <div className="dropdown">
                        {places.map((place) => (
                            <div
                                key={place}
                                className="dropdown-item"
                                onClick={() => {
                                    setFrom(place);
                                    setShowFromDropdown(false);
                                }}
                            >
                                {place}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={to}
                    onClick={() => setShowToDropdown(!showToDropdown)}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="To"
                />
                {showToDropdown && (
                    <div className="dropdown">
                        {places.map((place) => (
                            <div
                                key={place}
                                className="dropdown-item"
                                onClick={() => {
                                    setTo(place);
                                    setShowToDropdown(false);
                                }}
                            >
                                {place}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <BusList buses={buses} token={token} />
        </div>
    );
};

export default Search;
