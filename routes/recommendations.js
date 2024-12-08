const express = require('express');

const {
  getAllRecommendations,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation,
} = require('../controllers/recommendations');

//const { isAuthenticated } = require('../middleware/authenticate');

const router = express.Router();


/**
 * @swagger
 * /api/recommendations:
 *   get:
 *     tags:
 *       - Recommendations 
 *     summary: Retrieve all recommendations
 *     description: Get a list of all recommendations in the system.
 *     responses:
 *       200:
 *         description: A list of recommendations.
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
 *                   recommendation:
 *                     type: string
 *       500:
 *         description: Failed to fetch recommendations
 */
router.get('/recommendations', getAllRecommendations);

/**
 * @swagger
 * /api/recommendations:
 *   post:
 *     tags:
 *       - Recommendations 
 *     summary: Create a new recommendation
 *     description: Create a new recommendation in the system.
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
 *               recommendation:
 *                 type: string
 *       201:
 *         description: Recommendation created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to create movie
 */
router.post('/recommendations', createRecommendation);

/**
 * @swagger
 * /api/recommendations/{id}:
 *   put:
 *     tags:
 *       - Recommendations  
 *     summary: Update a recommendation
 *     description: Update an existing recommendation in the system by ID.
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
 *               recommendation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recommendation updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to update recommendation
 */
router.put('/recommendations/:id', updateRecommendation);

/**
 * @swagger
 * /api/recommendations/{id}:
 *   delete:
 *     tags:
 *       - Recommendations 
 *     summary: Delete a recommendation
 *     description: Delete a recommendation from the system by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the recommendation to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recommendation deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete recommendation
 */
router.delete('/recommendations/:id', deleteRecommendation);

module.exports = router;
