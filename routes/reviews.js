const express = require('express');

const {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews');

//const { isAuthenticated } = require('../middleware/authenticate');

const router = express.Router();


/**
 * @swagger
 * /api/reviews:
 *   get:
 *     tags:
 *       - Reviews 
 *     summary: Retrieve all reviews
 *     description: Get a list of all reviews in the system.
 *     responses:
 *       200:
 *         description: A list of reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   movieTitle:
 *                     type: string
 *                   starRating:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Failed to fetch reviews
 */
router.get('/reviews', getAllReviews);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     tags:
 *       - Reviews 
 *     summary: Create a new review
 *     description: Create a new review in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               movieTitle:
 *                 type: string
 *               starRating:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to create review
 */
router.post('/reviews', createReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     tags:
 *       - Reviews  
 *     summary: Update a review
 *     description: Update an existing review in the system by ID.
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
 *               username:
 *                 type: string
 *               movieTitle:
 *                 type: string
 *               starRating:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to update review
 */
router.put('/reviews/:id', updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     tags:
 *       - Reviews 
 *     summary: Delete a review
 *     description: Delete a review from the system by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the review to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete review
 */
router.delete('/reviews/:id', deleteReview);

module.exports = router;
