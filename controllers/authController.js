const User = require('../models/User');
const { generateToken } = require('../middleware/authMiddleware');

// Signup new user
exports.signup = async (req, res) => {
    try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
        });
    }

    // Create new user
    const user = await User.create({
        fullName,
        email,
        password
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            status: user.status
        }
        });
        } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
        success: false,
        message: 'Error creating user',
        error: error.message
        });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
    const { email, password } = req.body;

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
        });
    }

    // Check if user is active
    if (user.status !== 'active') {
        return res.status(403).json({
        success: false,
        message: 'Your account is inactive. Please contact admin.'
        });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
        });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            status: user.status,
            lastLogin: user.lastLogin
        }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
        success: false,
        message: 'Error during login',
        error: error.message
        });
    }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    res.json({
        success: true,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            status: user.status,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt
        }
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
        success: false,
        message: 'Error fetching user data'
        });
    }
};

// Logout user
exports.logout = async (req, res) => {
    try {
        // In JWT-based auth, logout is handled on client side by removing the token
        // This endpoint is for consistency and can be used for logging purposes
        res.json({
        success: true,
        message: 'Logout successful'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
        success: false,
        message: 'Error during logout'
        });
    }
};