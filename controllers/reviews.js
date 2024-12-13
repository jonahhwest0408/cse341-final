const Review = require('../models/reviews');

// GET all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
};

//GET a single review
const getSingleReview = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedReview = await Review.find(id);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch your review', error: error.message });
    }
};

// POST create a review
const createReview = async (req, res) => {
  const { username, movieTitle, starRating, description } = req.body;
  console.log(req.body);  // Log to ensure data is coming correctly


  // Validate data
  if (!username || !movieTitle || !starRating || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newReview = new Review({ username, movieTitle, starRating, description });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review', error: error.message });
  }
};

// PUT update a review by ID
const updateReview = async (req, res) => {
    const { id } = req.params;
    const { username, movieTitle, starRating, description } = req.body;
  
    if (!username && !movieTitle && !starRating && !description) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }
  
    try {
      const updatedReview = await Review.findByIdAndUpdate(
        id,
        { username, movieTitle, starRating, description },
        { new: true, runValidators: true }
      );
  
      if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update review', error: error.message });
    }
};

// DELETE a review by ID
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review', error: error.message });
  }
};

module.exports = {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview
};
