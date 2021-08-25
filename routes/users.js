// importing express
const { response } = require('express');
const express = require('express');

// initialize the router
const router = express.Router();

// routes

// register route
// when a button or route for register is specified the register page will be rendered
router.get('/register', (req,res) => res.render('register'));

// login route
// when a button or route for login is specified the login page will be rendered
router.get('/login', (req,res) => res.render('login'));

// exporting the router
module.exports = router;