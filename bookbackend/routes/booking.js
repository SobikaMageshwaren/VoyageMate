// routes/Booking.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Import Booking model

// Route to save a new booking
router.post('/', async (req, res) => {
    try {
        const bookingData = req.body;
        const newBooking = new Booking(bookingData);
        await newBooking.save();
        res.status(201).json({ message: 'Booking saved successfully!' });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ message: 'Failed to save booking', error });
    }
});

module.exports = router;
