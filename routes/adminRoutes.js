const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All routes require authentication and admin role
router.use(protect);
router.use(adminOnly);

// Get all users with pagination
router.get('/users', adminController.getAllUsers);

// Get single user
router.get('/users/:id', adminController.getUser);

// Activate user
router.put('/users/:id/activate', adminController.activateUser);

// Deactivate user
router.put('/users/:id/deactivate', adminController.deactivateUser);

// Delete user
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;