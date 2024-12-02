const User = require('../models/user');

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

// POST create a user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);  // Log to ensure data is coming correctly


  // Validate data
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
};

// PUT update a user by ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
  
    if (!name && !email && !password) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, password },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};

// DELETE a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
