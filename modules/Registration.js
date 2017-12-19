var logger = require('../config/winston_logging');
var common = require('../config/common');
var wait = require('wait.for');

module.exports.registerNewUser = function(req, res) {
  // console.log(req);
  var data = {'name': 'dilsahd'};

  var x = wait.for(common.saveData(data));
  res.send('registered');
};