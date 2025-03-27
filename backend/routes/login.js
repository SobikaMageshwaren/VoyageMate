const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to register a user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

// Route to login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }
    res.send('Login successful');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
