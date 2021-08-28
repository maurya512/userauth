const express = require('express');

// initializing the router using express Router
const router = express.Router();

// protect dashboard
const { ensureAuthenticated } = require('../config/auth');

// a basic route that renders the home page
// router.method (the route, (callback function)=>)
// Welcome page
router.get('/', (req, res) =>
    res.render('welcome'))

// Dashboard page
router.get('/dashboard', (req, res) =>
    res.render('dashboard', {
        name: req.user.name
    }))
// exporting the router
module.exports = router;