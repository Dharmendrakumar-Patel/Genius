const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/user");

// serialize user
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

// deserialize user
passport.deserializeUser(async (id, cb) => {
    const user = await User.findById({ id });
    cb(null, user);
})

passport.use(
    new GoogleStrategy({
        // options for google strategy
        callbackURL: '/auth/google/redirect',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }, async (accessToken, refreshToken, profile, cb) => {
        // passport callback function
        const email = profile.emails[0].value
        const fullName = profile.displayName
        const photo = profile.photos[0].value
        const googleId = profile.id

        // find the user with the given email
        const user = await User.findOne({ email });

        // check if the user exists and the password is correct
        if (user) {
            user.password = undefined;
            return cb(null, user)
        }
    
        // create a new user
        const newUser = await User.create({
            fullName,
            email,
            photo,
            googleId,
        });

        newUser.password = undefined;
        return cb(null, newUser);
    })
);