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