// models/Blog.js
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: '/images/default-image.jpg',
    },
});

module.exports = mongoose.model('Blog', BlogSchema);
