const User = require("../models/user");
const Message = require("../models/message");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const CookieToken = require("../utils/cookieToken");
const jwt = require('jsonwebtoken');

// Signup user => /signup (POST) => public access
exports.signup = BigPromise(async (req, res, next) => { 
    const { fullName, email, password } = req.body;

    console.log(req.body)
    
    // check if the user has provided all the required fields
    if(!fullName || !email || !password) {
        return next(new CustomError("full name, email and password are required fields.", 400));
    }

    // check if the user already exists
    console.log(await User.findOne({ email }))
    if (await User.findOne({ email })) {
        return next(new CustomError("User already exists.", 400));
    }

    // create a new user
    const user = await User.create({
        fullName,
        email,
        password,
    });

    console.log(user)

    user.password = undefined;

    CookieToken(user, res, 201);
});

// Login user => /login (POST) => public access 
exports.login = BigPromise(async (req, res, next) => { 
    const { email, password } = req.body;

    // check if the user has provided all the required fields
    if (!email || !password) { 
        return next(new CustomError("email and password are required fields.", 400));
    }

    // find the user with the given email
    const user = await User.findOne({ email }).select("+password"); 

    // check if the user exists and the password is correct
    if (!user || !(await user.correctPassword(password, user.password))) { 
        return next(new CustomError("Invalid email or password.", 400));
    }

    user.password = undefined;

    CookieToken(user, res, 200);
});

// Logout user => /logout (GET) => private access
exports.logout = BigPromise(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "User logged out successfully."
    });
});

exports.deleteUser = BigPromise(async (req, res, next) => {
    const { userId } = req.params;

    // check if the user has provided all the required fields
    if (!userId) {
        return next(new CustomError("userId is a required field.", 400));
    }

    await Message.deleteMany({ user: { _id: userId } });

    // remove the user
    await User.findByIdAndDelete(userId);

    // send response
    res.status(200).json({
        success: true,
        message: "User deleted successfully.",
    });
});

exports.getUserByToken = BigPromise(async (req, res, next) => {
    const { token } = req.body;

    // check if the user has provided all the required fields
    if (!token) {
        return next(new CustomError("token is a required field.", 400));
    }

    function getIdByToken (token) {
        return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return err;
            }
            return decoded;
        });
    };

    const userId = getIdByToken(token);

    // get the user
    const user = await User.findById(userId.id);

    // send response
    res.status(200).json({
        success: true,
        message: "User retrieved successfully.",
        user,
    });
});