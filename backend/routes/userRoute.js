const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword } = require('../controllers/userController');
const router = express.Router();

// for creating user -->
router.post('/register',registerUser)

// for user login -->
router.post('/login',loginUser)

// for password forgot -->
router.post('/password/forgot',forgotPassword)

// for password reset page -->
router.put('/password/reset/:token',resetPassword)

// for user logout -->
router.get('/logout',logout)

module.exports = router;