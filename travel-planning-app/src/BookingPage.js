// BookingPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './BookingPage.css';

const BookingPage = () => {
    const [userName, setUserName] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [transportMode, setTransportMode] = useState('');
    const [numberOfSeats, setNumberOfSeats] = useState(1);
    const [availableOptions, setAvailableOptions] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);

    const transportOptions = {
        bus: [
            { id: 1, name: "Luxury Coach", price: 50 },
            { id: 2, name: "Standard Bus", price: 30 },
        ],
        flight: [
            { id: 1, name: "Airline A", price: 150 },
            { id: 2, name: "Airline B", price: 200 },
        ],
        train: [
            { id: 1, name: "Express Train", price: 80 },
            { id: 2, name: "Luxury Train", price: 120 },
        ],
    };

    const handleTransportModeChange = (e) => {
        const mode = e.target.value;
        setTransportMode(mode);
        setAvailableOptions(transportOptions[mode] || []);
        setTotalPrice(0);
    };

    const handleBooking = (optionPrice) => {
        if (numberOfSeats > 0) {
            const selectedPrice = optionPrice * numberOfSeats;
            setTotalPrice(selectedPrice);
        } else {
            alert("Please select at least one seat.");
        }
    };

    const handlePayment = () => {
        handleBookingSubmission();
    };

    const handleBookingSubmission = async () => {
        const bookingData = {
            userName,
            source,
            destination,
            transportMode,
            numberOfSeats,
            totalPrice,
            paymentMethod,
        };

        try {
            const response = await axios.post('http://localhost:5001/api/bookings', bookingData);
            alert(response.data.message);
            setPaymentSuccessful(true);
        } catch (error) {
            console.error('Error saving booking:', error);
            alert('Failed to save booking. Please try again.');
        }
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    if (paymentSuccessful) {
        return (
            <div className="success-container">
                <div className="thank-you-box">
                    <h2 className="thank-you-message">Payment Successful!</h2>
                    <p>Thank you for your booking. Enjoy your trip!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="outer-container">
            <div className="booking-container">
                <h2>Booking Page</h2>
                <form className="booking-form">
                    <div className="form-group">
                        <label>User Name:</label>
                        <input 
                            type="text" 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Source:</label>
                        <input 
                            type="text" 
                            value={source} 
                            onChange={(e) => setSource(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Destination:</label>
                        <input 
                            type="text" 
                            value={destination} 
                            onChange={(e) => setDestination(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Transportation Mode:</label>
                        <select value={transportMode} onChange={handleTransportModeChange} required>
                            <option value="">Select...</option>
                            <option value="bus">Bus</option>
                            <option value="flight">Flight</option>
                            <option value="train">Train</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Number of Seats:</label>
                        <input 
                            type="number" 
                            value={numberOfSeats} 
                            onChange={(e) => setNumberOfSeats(e.target.value)} 
                            min="1" 
                            required 
                        />
                    </div>
                    <button type="button" onClick={() => handleBooking(totalPrice)}>Check Availability</button>
                </form>

                {availableOptions.length > 0 && (
                    <div className="available-options">
                        <h3>Available Options</h3>
                        <ul>
                            {availableOptions.map((option) => (
                                <li key={option.id}>
                                    {option.name} - ${option.price} per seat
                                    <button onClick={() => handleBooking(option.price)}>Book</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {totalPrice > 0 && (
                    <div className="billing-section">
                        <h3>Billing</h3>
                        <p>Total Amount: ${totalPrice}</p>
                        <label>Payment Method:</label>
                        <select value={paymentMethod} onChange={handlePaymentMethodChange} required>
                            <option value="">Select...</option>
                            <option value="GPay">GPay</option>
                            <option value="UPI">UPI</option>
                            <option value="Card">Credit/Debit Card</option>
                        </select>
                        <button onClick={handlePayment} disabled={!paymentMethod}>Pay Now</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;
