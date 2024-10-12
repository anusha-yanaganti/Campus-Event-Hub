// api/routes/userRoutes.js
const express = require('express');
const router = express.Router();


const { getUserById } = require('../controllers/userController'); // Import the controller

// Import the entire userController
const userController = require('../controllers/userController');

const authenticateUser = require('../middleware/authMiddleware');  // Import your middleware

// Destructure signupUser, loginUser, and authenticateUser from userController
const { signupUser, loginUser } = userController;

// Route for user registration (signup)
router.post('/signup', signupUser);

// Route for user login
router.post('/login', loginUser);


// Route to get the user details
router.get('/user-details', authenticateUser, getUserById);

module.exports = router;
