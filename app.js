// the main server file 
// bring in express
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// initiliaze the app
const app = express();

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// setup a port for deployment
const PORT = process.env.PORT || 5000;

// routes
app.use('/', require('./routes/index'));

// user routes
app.use('/users', require('./routes/users'));

// listen for the port request
app.listen(PORT, console.log(`The app is running on port ${PORT}`));

