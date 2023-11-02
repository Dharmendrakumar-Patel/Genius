const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get("/auth/google/redirect", passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }), (req, res) => {
    res.redirect('http://localhost:5173');
});

module.exports = router;