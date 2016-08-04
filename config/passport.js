var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var _ = require('lodash');
var debug = require('debug')('Proyecto:passport');

var User = require('../models/user.model');

passport.serializeUser(function(user, done){
	done(null, user._id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		var userinfo = _.pick(user, 'username', 'email', '_id');
		done(err, userinfo);
	})
})

passport.use(new LocalStrategy({
	usernameField: 'user',
	passwordField: 'password'
}, function(username, password, done){
	User.findByUsername(username, function(err, user){
		if (err) done(new Error("Error de autenticacion"));
		if (!user) {
			return done(null, false, {message: 'El usuario no existe'});
		}
		if (user.password != password) {
			return done(null, false, {message: 'La contraseña es inválida'})
		}
		debug("Usuario autenticado");
		return done(null, _.pick(user, 'username', 'email', '_id'));
	})
}));

module.exports = passport;