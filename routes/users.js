var express = require('express');
var router = express.Router();

// User profile
router.get('/', function(req, res, next) {
  res.render('user/profile', {});
});

//User Signup
router.get('/signup', function(req, res, next) {
	res.render('user/signup', {});
});

// User Login
router.get('/signin', function(req, res, next) {
	res.render('user/signin', {});
});


module.exports = router;
