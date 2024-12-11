const passport = require('passport');
const router = require('express').Router();

router
    .use('/movies', require('./movies'))
    .use('/recommendations', require('./recommendations'))
    .use('/reviews', require('./reviews'))
    .use('/userRoutes', require('./userRoutes'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err);}
        res.redirect('/');
    });
});

module.exports = router;