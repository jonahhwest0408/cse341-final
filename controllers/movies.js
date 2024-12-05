const Movie = require('../models/movies');

// GET all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies', error: error.message });
  }
};

//GET a single movie
const getSingleMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedMovie = await Movie.find(id);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch your movie', error: error.message });
    }
};

// POST create a movie
const createMovie = async (req, res) => {
  const { title, length, contentRating, genre, yearReleased, productionCompany, description } = req.body;
  console.log(req.body);  // Log to ensure data is coming correctly


  // Validate data
  if (!title || !length || !contentRating || !genre || !yearReleased || !productionCompany || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newMovie = new Movie({ title, length, contentRating, genre, yearReleased, productionCompany, description });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create movie', error: error.message });
  }
};

// PUT update a movie by ID
const updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, length, contentRating, genre, yearReleased, productionCompany, description } = req.body;
  
    if (!title && !length && !contentRating && !genre && !yearReleased && !productionCompany && !description) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }
  
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        id,
        { title, length, contentRating, genre, yearReleased, productionCompany, description },
        { new: true, runValidators: true }
      );
  
      if (!updatedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update movie', error: error.message });
    }
};

// DELETE a movie by ID
const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete movie', error: error.message });
  }
};

module.exports = {
  getAllMovies,
  getSingleMovie,
  createMovie,
  updateMovie,
  deleteMovie
};
