var express = require('express');
var router = express.Router();

var csurf = require('csurf');
var csrfProtection = csurf();

var passport = require('passport');

router.use(csrfProtection);

// User profile
router.get('/', function(req, res, next) {
  res.render('user/profile', {});
});

//User Signup
router.get('/signup', function(req, res, next) {
	var messages = req.flash('error');
	res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0 });
});

// User Login
router.get('/signin', function(req, res, next) {
	res.render('user/signin', {});

});

router.post('/signup', passport.authenticate('local.signup', {
	successRedirect: '/users/',
	failureRedirect: '/users/signup',
	failureFlash: true
}));


module.exports = router;
