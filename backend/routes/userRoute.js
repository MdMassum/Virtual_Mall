const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
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

// for user details -->
router.get('/me',isAuthenticatedUser,getUserDetails)

// for changing password -->
router.put('/password/update',isAuthenticatedUser,updatePassword)

// for updating user profile -->
router.put('/me/update',isAuthenticatedUser,updateProfile)

// for getting all users -->
router.get('/admin/users',isAuthenticatedUser,authorizeRoles("admin"),getAllUser)

// for getting single user,updating role & deleting user by admin -->
router.route('/admin/user/:id')
.get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)   // for getting single user
.put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)  // for updating user role
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)   // for deleting user

module.exports = router;