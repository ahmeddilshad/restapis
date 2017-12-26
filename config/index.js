var express = require('express'),
	router = express.Router(),
	register = require('../modules/client/Registration.js');
	admin = require('../modules/admin/Admin.js')

//admin routing can only be accesible by admin
router.post('/admin/register', admin.addAdmin);


router.get('/welcome', function (req, res) {
  res.send('welcome to my world');
});

router.post('/registeruser', register.registerNewUser);

module.exports = router;