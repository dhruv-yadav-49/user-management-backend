    const mongoose = require('mongoose');
    require('dotenv').config();

    const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    role: String,
    status: String
    }, { timestamps: true });

    const User = mongoose.model('User', userSchema);

    async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Check if admin exists
        const existing = await User.findOne({ email: 'admin@test.com' });
        if (existing) {
        console.log('❌ Admin already exists');
        
        // Update to admin if not
        if (existing.role !== 'admin') {
            existing.role = 'admin';
            await existing.save();
            console.log('✅ Updated user to admin role');
        }
        process.exit(0);
        }

        // Create new admin
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('Admin@123', salt);

        await User.create({
        fullName: 'Admin User',
        email: 'admin@test.com',
        password: hashedPassword,
        role: 'admin',
        status: 'active'
        });

        console.log('✅ Admin created successfully!');
        console.log('📧 Email: admin@test.com');
        console.log('🔑 Password: Admin@123');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
    }

    createAdmin();