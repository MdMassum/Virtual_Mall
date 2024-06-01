const express = require('express');
const {getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// create product --> Admin access
router.post('/product/new',isAuthenticatedUser,authorizeRoles("admin"),createProduct)

// get single Product details
router.get('/product/:id',getProductDetails);

// getting all products
router.get('/products',getAllProducts);

// update the product  -- Admin
// router.route("/product/:id").put(updateProduct).delete(deleteProduct);
router.put('/product/:id',isAuthenticatedUser,authorizeRoles("admin"),updateProduct);

// delete the product -- Admin
router.delete('/product/:id',isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

// creating and updating review -->
router.put('/review',isAuthenticatedUser,createProductReview);

// get all reviews -->
router.get('/reviews',getProductReviews);

// for deleting reviews -->
router.delete('/reviews',isAuthenticatedUser,deleteReview);

module.exports = router