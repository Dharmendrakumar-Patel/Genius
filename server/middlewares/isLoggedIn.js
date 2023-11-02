const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Protect routes
exports.isLoggedIn = BigPromise(async (req, res, next) => {
    const { token } = req.cookies || req.header("Authorization").replace("Bearer ", "");

    console.log(token);

    if (!token) {
        return next(new CustomError("You are not logged in.", 401));
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = await User.findById(decoded.id);

    console.log(req.user);

    next();
});