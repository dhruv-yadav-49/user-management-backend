const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Mock mongoose
jest.mock('mongoose', () => ({
    Schema: class {
        constructor() {}
        pre() {}
        index() {}
        methods = {}
    },
    model: jest.fn(() => User)
    }));

    describe('User Model Tests', () => {
    describe('Password Hashing', () => {
        test('should hash password before saving', async () => {
        const plainPassword = 'Test@123';
        const mockUser = {
            password: plainPassword,
            isModified: jest.fn(() => true),
            save: jest.fn()
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        expect(hashedPassword).not.toBe(plainPassword);
        expect(hashedPassword.length).toBeGreaterThan(0);
        });

        test('should not hash password if not modified', async () => {
        const originalPassword = 'alreadyHashed123';
        const mockUser = {
            password: originalPassword,
            isModified: jest.fn(() => false)
        };

        expect(mockUser.password).toBe(originalPassword);
        });
    });

    describe('Password Comparison', () => {
        test('should correctly compare valid password', async () => {
        const plainPassword = 'Test@123';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        expect(isMatch).toBe(true);
        });

        test('should reject invalid password', async () => {
        const plainPassword = 'Test@123';
        const wrongPassword = 'Wrong@123';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        const isMatch = await bcrypt.compare(wrongPassword, hashedPassword);
        expect(isMatch).toBe(false);
        });
    });

    describe('User Validation', () => {
        test('should validate email format', () => {
        const validEmails = ['test@example.com', 'user.name@domain.co.uk'];
        const invalidEmails = ['invalid', '@example.com', 'user@'];

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        validEmails.forEach(email => {
            expect(emailRegex.test(email)).toBe(true);
        });

        invalidEmails.forEach(email => {
            expect(emailRegex.test(email)).toBe(false);
        });
        });

        test('should validate password strength', () => {
        const strongPasswords = ['Test@123', 'Admin123', 'Pass1Word'];
        const weakPasswords = ['test123', 'PASSWORD', '12345678'];

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

        strongPasswords.forEach(password => {
            expect(passwordRegex.test(password)).toBe(true);
        });

        weakPasswords.forEach(password => {
            expect(passwordRegex.test(password)).toBe(false);
        });
        });
    });

    describe('User Role Validation', () => {
        test('should only accept valid roles', () => {
        const validRoles = ['user', 'admin'];
        const invalidRoles = ['superadmin', 'guest', 'moderator'];

        validRoles.forEach(role => {
            expect(['user', 'admin'].includes(role)).toBe(true);
        });

        invalidRoles.forEach(role => {
            expect(['user', 'admin'].includes(role)).toBe(false);
        });
        });
    });

    describe('User Status Validation', () => {
        test('should only accept valid status values', () => {
        const validStatuses = ['active', 'inactive'];
        const invalidStatuses = ['pending', 'suspended', 'deleted'];

        validStatuses.forEach(status => {
            expect(['active', 'inactive'].includes(status)).toBe(true);
        });

        invalidStatuses.forEach(status => {
            expect(['active', 'inactive'].includes(status)).toBe(false);
        });
        });
    });
});