import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Search from './components/Search';
import Booking from './components/Booking';

const App = () => {
    const [token, setToken] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Login setAuth={setToken} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search token={token} />} />
                <Route path="/booking/:busId" element={<Booking token={token} />} />
            </Routes>
        </Router>
    );
};

export default App;
