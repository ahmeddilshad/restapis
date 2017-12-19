'use strict';
var logger = require('./winston_logging');
var db = require('./database').db;

module.exports = {
  saveData: function(data, cb) {
    console.log(data);
    var pool = require('../config/database')();
    var con = pool.getConnection();
    console.log(con);
  }
};