const express = require('express');
const router = express.Router();
const user = require('../model/userSchema');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
require('./passportLocal')(passport);
const userRoutes = require('./accountRoutes');


router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("index", { logged: true });
    } else {
        res.render("index", { logged: false });
    }
});

router.get('/login', (req, res) => {
    res.render("login", { csrfToken: req.csrfToken() });
});

router.get('/signup', (req, res) => {
    res.render("signup", { csrfToken: req.csrfToken() });
});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/profile',
        failureFlash: true,
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});


router.get('/profile',  (req, res) => {

    res.render('profile', { username: req.user.username, verified : req.user.isVerified });

});


router.use(userRoutes);

module.exports = router;