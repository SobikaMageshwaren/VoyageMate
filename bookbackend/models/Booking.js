// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userName: String,
    source: String,
    destination: String,
    transportMode: String,
    numberOfSeats: Number,
    totalPrice: Number,
    paymentMethod: String
});

module.exports = mongoose.model('Booking', bookingSchema);
