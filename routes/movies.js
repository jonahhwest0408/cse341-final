const express = require('express');
const {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movies');

const router = express.Router();


/**
 * @swagger
 * /api/movies:
 *   get:
 *     tags:
 *       - Movies 
 *     summary: Retrieve all movies
 *     description: Get a list of all movies in the system.
 *     responses:
 *       200:
 *         description: A list of movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   length:
 *                     type: string
 *                   contentRating:
 *                     type: string
 *                   genre:
 *                     type: string
 *                   yearReleased:
 *                     type: string
 *                   productionCompany:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Failed to fetch movies
 */
router.get('/movies', getAllMovies);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     tags:
 *       - Movies 
 *     summary: Create a new movie
 *     description: Create a new movie in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               length:
 *                 type: string
 *               contentRating:
 *                 type: string
 *               genre:
 *                 type: string
 *               yearReleased:
 *                 type: string
 *               productionCompany:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to create movie
 */
router.post('/movies', createMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     tags:
 *       - Movies  
 *     summary: Update a movie
 *     description: Update an existing movie in the system by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               length:
 *                 type: string
 *               contentRating:
 *                 type: string
 *               genre:
 *                 type: string
 *               yearReleased:
 *                 type: string
 *               productionCompany:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to update movie
 */
router.put('/movies/:id', updateMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     tags:
 *       - Movies 
 *     summary: Delete a movie
 *     description: Delete a movie from the system by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the movie to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete movie
 */
router.delete('/movies/:id', deleteMovie);

module.exports = router;
