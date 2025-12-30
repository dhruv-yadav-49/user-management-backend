const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
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
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
        success: false,
        message: 'Error fetching profile'
        });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
    const { fullName, email } = req.body;
    const updateData = {};

    if (fullName) updateData.fullName = fullName;
    if (email) {
      // Check if email already exists
        const existingUser = await User.findOne({ 
            email, 
            _id: { $ne: req.user._id } 
        });

        if (existingUser) {
            return res.status(400).json({
            success: false,
            message: 'Email is already in use'
            });
        }

        updateData.email = email;
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        updateData,
        { new: true, runValidators: true }
    );

    if (!user) {
        return res.status(404).json({
        success: false,
        message: 'User not found'
        });
    }

    res.json({
        success: true,
        message: 'Profile updated successfully',
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            status: user.status
        }
        });
        } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
        success: false,
        message: 'Error updating profile'
        });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    // Verify current password
    const isPasswordCorrect = await user.comparePassword(currentPassword);

    if (!isPasswordCorrect) {
        return res.status(401).json({
            success: false,
            message: 'Current password is incorrect'
        });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
        success: true,
        message: 'Password changed successfully'
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
        success: false,
        message: 'Error changing password'
        });
    }
};