var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res){
	res.render('login');
});

var passportAuth = passport.authenticate('local', {failureRedirect: '/user/login', failureFlash: false});

router.post('/auth', passportAuth, function(req, res){
	var post = req.body;
	res.redirect('/');
});

module.exports = router;
