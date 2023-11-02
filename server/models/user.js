const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please enter your full name'],
        maxLength: [40, "Name cannot exceed 40 characters"]
    }, email: {
        type: String,
        validate: [validator.isEmail, "Please enter a valid email"],
        required: [true, 'Please enter your email'],
        unique: true
    }, password: {
        type: String,
        required: false,
        minlength: [6, 'Password should be atleast 6 characters long'],
        select: false,
    }, photo: {
        type: String,
        default: 'https://res.cloudinary.com/dvgp7oeov/image/upload/v1692950295/Demo-User/men/fashion-boy-with-yellow-jacket-blue-pants_ilpeki.jpg',
        required: false
    }, googleId: {
        type: String,
        required: false
    }, facebookId: {
        type: String,
        required: false
    }, freeToken: {
        type: Number,
        default: 5,
    }
}, { timestamps: true });

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.correctPassword = async function (userPassword, dbPassword) {
    return await bcrypt.compare(userPassword, dbPassword);
};


// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    });
};

module.exports = mongoose.model('User', userSchema);