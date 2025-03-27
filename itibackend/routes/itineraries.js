// routes/itineraries.js
const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');

// POST route to create an itinerary
router.post('/', async (req, res) => {
  try {
    const { source, destination, passengers, transportation, phoneNumber } = req.body;
    const itinerary = new Itinerary({ source, destination, passengers, transportation, phoneNumber });
    await itinerary.save();
    res.status(201).json({ message: 'Itinerary saved successfully!' });
  } catch (error) {
    console.error('Error saving itinerary:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to fetch all itineraries
router.get('/', async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.status(200).json(itineraries);
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
