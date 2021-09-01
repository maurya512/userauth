// creating a strategy
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// load user model
const User = require('../models/User');

// exporting the strateg
module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // match user
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        // if no user found return null, with no user and an error message
                        return done(null, false, { message: 'Email is not registered' });
                    }

                    // match password using bcrypt
                    // comparing the input string 'password' to hashed 'user.password'
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            // if passwords match return null with the user
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password Incorrect' });
                        }
                    });
                });
        })
    );

    // serializing and deserializing the user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}