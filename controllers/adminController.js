const User = require('../models/User');

// Get all users with pagination
exports.getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Optional filters
        const filters = {};
        if (req.query.status) filters.status = req.query.status;
        if (req.query.role) filters.role = req.query.role;
        if (req.query.search) {
        filters.$or = [
            { fullName: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } }
        ];
        }

        const totalUsers = await User.countDocuments(filters);
        const users = await User.find(filters)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        res.json({
        success: true,
        users,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers,
            limit
        }
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({
        success: false,
        message: 'Error fetching users'
        });
    }
    };

    // Get single user
    exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
        }

        res.json({
        success: true,
        user
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
        success: false,
        message: 'Error fetching user'
        });
    }
    };

    // Activate user
    exports.activateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
        }

        // Prevent admin from deactivating themselves
        if (user._id.toString() === req.user._id.toString()) {
        return res.status(400).json({
            success: false,
            message: 'You cannot activate/deactivate your own account'
        });
        }

        if (user.status === 'active') {
        return res.status(400).json({
            success: false,
            message: 'User is already active'
        });
        }

        user.status = 'active';
        await user.save();

        res.json({
        success: true,
        message: 'User activated successfully',
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            status: user.status
        }
        });
    } catch (error) {
        console.error('Activate user error:', error);
        res.status(500).json({
        success: false,
        message: 'Error activating user'
        });
    }
    };

    // Deactivate user
    exports.deactivateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
        }

        // Prevent admin from deactivating themselves
        if (user._id.toString() === req.user._id.toString()) {
        return res.status(400).json({
            success: false,
            message: 'You cannot activate/deactivate your own account'
        });
        }

        if (user.status === 'inactive') {
        return res.status(400).json({
            success: false,
            message: 'User is already inactive'
        });
        }

        user.status = 'inactive';
        await user.save();

        res.json({
        success: true,
        message: 'User deactivated successfully',
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            status: user.status
        }
        });
    } catch (error) {
        console.error('Deactivate user error:', error);
        res.status(500).json({
        success: false,
        message: 'Error deactivating user'
        });
    }
    };

    // Delete user
    exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
        }

        // Prevent admin from deleting themselves
        if (user._id.toString() === req.user._id.toString()) {
        return res.status(400).json({
            success: false,
            message: 'You cannot delete your own account'
        });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({
        success: true,
        message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
        success: false,
        message: 'Error deleting user'
        });
    }
};