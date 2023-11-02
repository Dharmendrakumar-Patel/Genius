const express = require('express');
const cookieParser = require("cookie-parser");
const logger = require('morgan');
const cors = require('cors');
const expressSession = require('express-session');
const passport = require('passport');
require('dotenv').config();
require("./config/passportSetup");

const app = express();
const user = require("./routes/user");
const auth = require("./routes/auth");
const message = require("./routes/message");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());

// Configure session management
app.use(
  expressSession({
    maxAge: process.env.JWT_COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000,
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

// Initialize Passport and session middleware
app.use(passport.initialize());
app.use(passport.session());

//routes middleware
app.get("/", (req, res) => { res.send("lakeBrains API"); });
app.use("/", user);
app.use("/", auth);
app.use("/", message);

module.exports = app;