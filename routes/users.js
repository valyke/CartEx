var express = require('express');
var router = express.Router();

var csurf = require('csurf');
var csrfProtection = csurf();

var passport = require('passport');

router.use(csrfProtection);

// User profile
router.get('/profile', function(req, res, next) {
  res.render('user/profile', {});
});

//User Signup
router.get('/signup', function(req, res, next) {
	var messages = req.flash('error');
	res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0 });
});

router.post('/signup', passport.authenticate('local.signup', {
	successRedirect: '/user/profile',
	failureRedirect: '/user/signup',
	failureFlash: true
}));

// User Login
router.get('/signin', function(req, res, next) {
	var messages = req.flash('error');
	res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0 });

});

router.post('/signin', passport.authenticate('local.signin', {
	successRedirect: '/user/profile',
	failureRedirect: '/user/signin',
	failureFlash: true

}));

// User Logout
router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});



module.exports = router;
