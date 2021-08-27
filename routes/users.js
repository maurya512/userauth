// importing express
const { response } = require('express');
const express = require('express');

// initialize the router
const router = express.Router();

// routes

// register route
// when a button or route for register is specified the register page will be rendered
router.get('/register', (req, res) => res.render('register'));

// login route
// when a button or route for login is specified the login page will be rendered
router.get('/login', (req, res) => res.render('login'));

// Register Handle
router.post('/register', (req, res) => {
    // destructuring the data from req.body and storing it inside a variable
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // check required fields 
    if (!name || !email || !password || !password2) {
        errors.push({ message: 'Please fill in all fields' });
    }

    // check passwords match
    if (password !== password2) {
        errors.push({ message: 'Passwords do not match' });
    }

    // check if the password is at least 6 characters long
    if (password.length <= 5) {
        errors.push({ message: 'Password must be at least 6 characters long' });
    }

    if (errors.length > 0) {
        // if any of the requirements are not met re render the register field
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        res.send('pass');
    }
});

// exporting the router
module.exports = router;