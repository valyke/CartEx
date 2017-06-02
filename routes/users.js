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

router.post('/signup', passport.authenticate('local.signup', {
	successRedirect: '/user/',
	failureRedirect: '/user/signup',
	failureFlash: true
}));

// User Login
router.get('/signin', function(req, res, next) {
	var messages = req.flash('error');
	res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0 });

});

router.post('/signin', passport.authenticate('local.signin', {
	successRedirect: '/user/',
	failureRedirect: '/user/signin',
	failureFlash: true

}));





module.exports = router;
