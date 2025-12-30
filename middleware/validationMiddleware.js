const { body, validationResult } = require('express-validator');

// Validation rules for signup
exports.signupValidation = [
    body('fullName')
        .trim()
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters'),
    
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    
        body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// Validation rules for login
exports.loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    
        body('password')
            .notEmpty().withMessage('Password is required')
];

// Validation rules for updating profile
exports.updateProfileValidation = [
    body('fullName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters'),
    
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail()
];

// Validation rules for changing password
exports.changePasswordValidation = [
    body('currentPassword')
        .notEmpty().withMessage('Current password is required'),
    
    body('newPassword')
        .notEmpty().withMessage('New password is required')
        .isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// Middleware to handle validation errors
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({
            field: err.path,
            message: err.msg
        }))
        });
    }
    
    next();
};