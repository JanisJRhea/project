import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './booking.css';

const Booking = ({ token }) => {
    const { busId } = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        // Fetch the booked seats for the bus
        const fetchBookedSeats = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/book`, {
                    params: { busId },
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookedSeats(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBookedSeats();
    }, [busId, token]);

    const handleSeatClick = (seatNumber) => {
        setSelectedSeats((prevSelectedSeats) =>
            prevSelectedSeats.includes(seatNumber)
                ? prevSelectedSeats.filter(seat => seat !== seatNumber)
                : [...prevSelectedSeats, seatNumber]
        );
    };

    const handleBooking = async () => {
        try {
            await axios.post(`http://localhost:5000/api/book`, { busId, seats: selectedSeats }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Booking successful!');
            setBookedSeats((prevBookedSeats) => [...prevBookedSeats, ...selectedSeats]); // Update booked seats
            setSelectedSeats([]);
            setBookingSuccess(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="booking">
            <h2>Book Your Seats</h2>
            <div className="seats-container">
                <div className="seats-section">
                    <h3>Women's Seats</h3>
                    {[...Array(25).keys()].map(i => {
                        const seatNumber = i + 1;
                        const isBooked = bookedSeats.includes(seatNumber);
                        const isSelected = selectedSeats.includes(seatNumber);
                        return (
                            <div
                                key={seatNumber}
                                className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : ''}`}
                                onClick={() => !isBooked && handleSeatClick(seatNumber)}
                            >
                                {seatNumber}
                            </div>
                        );
                    })}
                </div>
                <div className="seats-section">
                    <h3>Men's Seats</h3>
                    {[...Array(25).keys()].map(i => {
                        const seatNumber = i + 26;
                        const isBooked = bookedSeats.includes(seatNumber);
                        const isSelected = selectedSeats.includes(seatNumber);
                        return (
                            <div
                                key={seatNumber}
                                className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : ''}`}
                                onClick={() => !isBooked && handleSeatClick(seatNumber)}
                            >
                                {seatNumber}
                            </div>
                        );
                    })}
                </div>
            </div>
            <button onClick={handleBooking}>Confirm Booking</button>
            {bookingSuccess && <p>Your booking was successful!</p>}
        </div>
    );
};

export default Booking;
