const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const {
    signupValidation,
    loginValidation,
    handleValidationErrors
} = require('../middleware/validationMiddleware');

// Public routes
router.post('/signup', signupValidation, handleValidationErrors, authController.signup);
router.post('/login', loginValidation, handleValidationErrors, authController.login);

// Protected routes
router.get('/me', protect, authController.getCurrentUser);
router.post('/logout', protect, authController.logout);

module.exports = router;