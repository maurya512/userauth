// importing express
const express = require('express');

// initialize the router
const router = express.Router();

// importing bcrypt
const bcrypt = require('bcryptjs')

// passport
const passport = require('passport');

// User model
const User = require('../models/User');


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
        // validation successful
        // checks to see if 1 email is being used to register for more than 1 accounts
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    // user exists
                    errors.push({ message: 'Email already registered' })
                    // res.render will render the view with data passed to it
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    })

                    // hashing the password
                    // generating a salt to create a hash
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        // setting the user's password to hash
                        newUser.password = hash;
                        // Save user
                        newUser.save()
                            .then(user => {
                                req.flash('success_message', 'Welcome! You are now logged in' );
                                // res.redirect will redirect the user to another page(and a new req starts over)
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err))
                    }))
                }
            });
    }
});

// login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
})

// logout handle
router.get('/logout', (req, res) => {
    // built in logout method in passport
    req.logout();
    // flash message to display the user successfully logged out
    req.flash('success_message', 'Successfully logged out');
    // redirect the user to login screen
    res.redirect('/users/login');
})

// exporting the router
module.exports = router;