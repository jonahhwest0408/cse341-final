const Recommendation = require('../models/recommendations');

// GET all recommendations
const getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find();
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recommendations', error: error.message });
  }
};

//GET a single recommendation
const getSingleRecommendation = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedRecommendation = await Recommendation.find(id);
        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch your recommendation', error: error.message });
    }
};

// POST create a recommendation
const createRecommendation = async (req, res) => {
  const { username, movieTitle, recommendation } = req.body;
  console.log(req.body);  // Log to ensure data is coming correctly


  // Validate data
  if (!username || !movieTitle || !recommendation) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newRecommendation = new Recommendation({ username, movieTitle, recommendation });
    await newRecommendation.save();
    res.status(201).json(newRecommendation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create recommendation', error: error.message });
  }
};

// PUT update a recommendation by ID
const updateRecommendation = async (req, res) => {
    const { id } = req.params;
    const { username, movieTitle, recommendation } = req.body;
  
    if (!username && !movieTitle && !recommendation) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }
  
    try {
      const updatedRecommendation = await Recommendation.findByIdAndUpdate(
        id,
        { username, movieTitle, recommendation },
        { new: true, runValidators: true }
      );
  
      if (!updatedRecommendation) {
        return res.status(404).json({ message: 'Recommendation not found' });
      }
  
      res.status(200).json(updatedRecommendation);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update recommendation', error: error.message });
    }
};

// DELETE a recommendation by ID
const deleteRecommendation = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecommendation = await Recommendation.findByIdAndDelete(id);

    if (!deletedRecommendation) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }

    res.status(200).json({ message: 'Recommendation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete recommendation', error: error.message });
  }
};

module.exports = {
  getAllRecommendations,
  getSingleRecommendation,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation
};