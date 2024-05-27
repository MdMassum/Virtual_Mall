const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

// for creating user -->
router.post('/register',registerUser)

// for user login -->
router.post('/login',loginUser)

module.exports = router;