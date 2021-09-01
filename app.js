// the main server file 
// bring in express
const express = require('express');
// dependencies for views
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
// importing flash to display messages when redirect occurs 
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport'); 
require('dotenv').config();
// passport config
require('./config/passport')(passport);

// initiliaze the app
const app = express();

// database config  by bringing in the mongouri from config folder
const DB = require('./config/keys').mongoURI;

// mongoose.connect('mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pc8lw.mongodb.net/authusers?retryWrites=true&w=majority', (err) => {
//     if(err) throw err;
// })

// connection to mongodb
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// ejs
// views middleware
app.use(expressLayouts);
// set the view engine to ejs 
app.set('view engine', 'ejs');

// body parser
// enables us to acesss the data from the form using req.body
app.use(express.urlencoded({ extended: false }));

// express session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// global vars 
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
})

// setup a port for deployment
const PORT = process.env.PORT || 5000;

// routes
// app.use adds a new layer to the express middleware stack which can be used or executed in order they are defined
app.use('/', require('./routes/index'));

// user routes
// app.use adds a new layer to the express middleware stack which can be used or executed in order they are defined
app.use('/users', require('./routes/users'));

// listen for the port request
app.listen(PORT, console.log(`The app is running on port ${PORT}`));

