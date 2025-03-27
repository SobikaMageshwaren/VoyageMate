// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const itineraryRoutes = require('./routes/itineraries');

// Create an Express application
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection URI and port
const MONGO_URI = 'mongodb://localhost:27017/itinerary'; // Replace with your actual MongoDB connection URI
const PORT = 5002;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/itineraries', itineraryRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
