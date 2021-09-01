// ensures the dashboard is only accessible to logged in users
module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next;
        }
        req.flash('error_message', 'Please log in to view the dashboard');
        res.redirect('/users/login');
    }
}