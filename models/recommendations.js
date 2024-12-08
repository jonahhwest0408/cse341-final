const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  movieTitle: { type: String, required: true },
  recommendation: { type: String, required: true }
});

module.exports = mongoose.model('Recommendations', recommendationSchema);