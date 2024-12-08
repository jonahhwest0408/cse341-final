const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  username: { type: String, required: true },
  movieTitle: { type: String, required: true },
  starRating: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Reviews', reviewSchema);