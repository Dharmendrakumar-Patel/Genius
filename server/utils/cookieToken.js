const CookieToken = (user, res, statusCode) => {
    const token = user.getJwtToken(); // generate a token for the user

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    console.log(token, options)

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user
    })
};

module.exports = CookieToken;