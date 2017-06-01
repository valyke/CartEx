var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../model/user');

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use('local.signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done) {
	
	/**
	 * { Checks form input }
	 * @param 1st - field_name
	 * @param 2nd - message if validation failed
	 */
	req.checkBody('email', 'Invalid email').notEmpty().isEmail();
	req.checkBody('password', 'Invalid Password').notEmpty().isLength({ min: 4 });

	var errors = req.validationErrors();

	// If has form errors, store the msgs
	if(errors) {
		// to be used in the signup view
		var messages = [];

		// Loop form error messages, store to messages[]
		errors.forEach(function(error) {
			// console.log(error);
			messages.push(error.msg);
		});
		
		// pass form errors to view
		return done(null, false, req.flash('error', messages));
	}



	// If user exists, don't create new account
	User.findOne({ 'email': email }, function(err, user) {
		// If there is error, return error
		if(err) {
			return done(err);
		}
		// If user exists, no error, no user object, flash message
		if(user) {
			done(null, false, { message: 'Email is already taken.' });
		}

		// Create User
		var newUser = new User();
		newUser.email = email;
		newUser.password = newUser.encryptPassword(password);
		newUser.save(function(err, user) {
			if (err)
				return done(err);
			
			return done(null, newUser);
		});
	});
}));