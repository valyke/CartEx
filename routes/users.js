var express = require('express');
var router = express.Router();

var csurf = require('csurf');
var csrfProtection = csurf();

router.use(csrfProtection);

// User profile
router.get('/', function(req, res, next) {
  res.render('user/profile', {});
});

//User Signup
router.get('/signup', function(req, res, next) {
	res.render('user/signup', { csrfToken: req.csrfToken() });
});

// User Login
router.get('/signin', function(req, res, next) {
	res.render('user/signin', {});
});


module.exports = router;
