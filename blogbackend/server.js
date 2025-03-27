// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5003;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travel-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

// Routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blogs', blogRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
