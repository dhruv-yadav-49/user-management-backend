const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const {
    updateProfileValidation,
    changePasswordValidation,
    handleValidationErrors
} = require('../middleware/validationMiddleware');

// All routes are protected
router.use(protect);

// Get user profile
router.get('/profile', userController.getProfile);

// Update user profile
router.put('/profile', updateProfileValidation, handleValidationErrors, userController.updateProfile);

// Change password
router.put('/change-password', changePasswordValidation, handleValidationErrors, userController.changePassword);

module.exports = router;