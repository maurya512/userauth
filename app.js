// the main server file 
// bring in express
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

// initiliaze the app
const app = express();

// database config  by bringing in the mongouri from config folder
const DB = require('./config/keys').mongoURI;

// connection to mongodb
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// body parser
app.use(express.urlencoded({ extended: false }));

// setup a port for deployment
const PORT = process.env.PORT || 5000;

// routes
app.use('/', require('./routes/index'));

// user routes
app.use('/users', require('./routes/users'));

// listen for the port request
app.listen(PORT, console.log(`The app is running on port ${PORT}`));

