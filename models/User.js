// user schema with all the required fields for the form

// importing mongoose
const mongoose = require('mongoose');

// setting up default requirements for the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// creating a new user and setting it to a const
const User = mongoose.model('User', userSchema);

// exporting that user
module.exports = User;