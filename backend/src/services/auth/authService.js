const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');
const Order = require('../../models/Order');
const OrCartItemder = require('../../models/Order');


const createUser = async (userData) => {
    try {
        const { email, password, firstName, lastName } = userData;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error('User already exists!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: 'CUSTOMER',
            password: hashedPassword
        });

        const order = new Order({
            amount: 0,
            address: "Default address",
            orderStatus: "PENDING",
            user: user,
        });
        await order.save();
        await user.save();
        return user;
    } catch (error) {
        console.log('Error creating user:', error.message);
        throw error;
    }
};

const loginUser = async (userData) => {
    try {
        const { email, password } = userData;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new Error('User does not exist!');
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password!');
        }

        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRETE, 
            { expiresIn: '1d' }
        );

        return token;
    } catch (error) {
        console.log(`Error logging in user: ${error.message}`);
        throw error;
    }
};

module.exports = { createUser, loginUser };
