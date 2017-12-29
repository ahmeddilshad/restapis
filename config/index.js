var express = require('express'),
	router = express.Router(),
	register = require('../modules/client/Registration.js'),
	admin = require('../modules/admin/Admin.js'),
	validateRequest = require('../middlewares/ValidateRequest'),
	triggerAPI = require('../modules/admin/triggerMemcachedAPI');

//admin routing can only be accesible by admin
router.post('/admin/register', validateRequest.validateAdminRegistrationAPIParams, admin.addAdmin);


router.get('/welcome', function (req, res) {
  res.send('welcome to my world');
});

router.post('/registeruser', register.registerNewUser);

router.post('/triggerAPI', triggerAPI.triggerMemcachedAPI)

module.exports = router;