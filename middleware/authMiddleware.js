const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
exports.protect = async (req, res, next) => {
    try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
        success: false,
        message: 'Not authorized. Please login.'
        });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'User not found'
        });
    }

    // Check if user is active
    if (user.status !== 'active') {
        return res.status(403).json({
            success: false,
            message: 'Your account is inactive. Please contact admin.'
        });
    }

    // Attach user to request object
    req.user = user;
    next();
    } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
        success: false,
        message: 'Invalid token'
        });
    }
    
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.'
        });
    }

    return res.status(500).json({
        success: false,
        message: 'Authentication failed'
    });
    }
};

// Check if user is admin
exports.adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.'
        });
    }
};

// Generate JWT token
exports.generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
};