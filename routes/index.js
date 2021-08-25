const express = require('express');

// initializing the router using express Router
const router = express.Router();

// a basic route that renders the home page
// router.method (the route, (callback function)=>)
router.get('/', (req, res) => {
    res.render('welcome');
})

// exporting the router
module.exports = router;