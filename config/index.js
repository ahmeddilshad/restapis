var express = require('express'),
	router = express.Router(),
	register = require('../modules/Registration.js')

router.get ('/welcome', function (req, res) {
  res.send('welcome to my world');
});

router.get ('/register', register.registerNewUser);

module.exports = router;