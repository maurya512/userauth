// importing express
const express = require('express');

// initializing the router using express Router
const router = express.Router();

// protect dashboard
const { ensureAuthenticated } = require('../config/auth');

// a basic route that renders the home page
// router.method (the route, (callback function)=>)
// Welcome page
router.get('/', (req, res) =>
// renders the welcome.ejs page
    res.render('welcome'))

// Dashboard page
router.get('/dashboard', (req, res) =>
// renders the dashboard.ejs page and the user name from the form
    res.render('dashboard', {
        name: req.user.name
    }))
// exporting the router
module.exports = router;