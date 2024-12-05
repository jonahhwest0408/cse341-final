const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  length: { type: String, required: true },
  contentRating: { type: String, required: true },
  genre: { type: String, required: true },
  yearReleased: { type: String, required: true},
  productionCompany: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Movies', moviesSchema);