// models/Itinerary.js
const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  passengers: { type: Number, required: true },
  transportation: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
