const express = require('express');
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();


/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users  
 *     summary: Retrieve all users
 *     description: Get a list of all users in the system.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Failed to fetch users
 */
router.get('/users', getAllUsers); // GET all users

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users  
 *     summary: Create a new user
 *     description: Create a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to create user
 */
router.post('/users', createUser); // POST create a user

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users  
 *     summary: Update a user
 *     description: Update an existing user in the system by ID.
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to update user
 */
router.put('/users/:id', updateUser); // PUT update a user

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users  
 *     summary: Delete a user
 *     description: Delete a user from the system by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete user
 */
router.delete('/users/:id', deleteUser); // DELETE a user

module.exports = router;
