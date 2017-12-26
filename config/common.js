var logger = require('./winston_logging');
var db = require('./database').db;
var constants = require('./constants');

module.exports = {

  /**
   * Function sendJSONresponse
   * this function is used to send response to client after creating checksum
   * @param {res, status, content}
   */

  sendJSONresponse: function(res, status, content) {
    logger.info('Restapi :: sendJSONresponse content: ' + content + ' status : ' + status);
    res.status(status);
    res.json(content);
    return;
  },

   dateTime :function() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var curentDateTime = year + '/' + month + '/' + day + ' ' + hours + ':'+  minutes + ':' + seconds;
    return curentDateTime;
  },

  saveData: function(data, tableName, cb) {
    logger.info('Restapi :: saveData method input params :: ' + JSON.stringify(data) + ' for table :: ' + tableName);
    var pool = require('../config/database')();
    try {
      var con = pool.getConnection(function(err, con) {
        if (err) {
          logger.error("Restapi :: Error in saveData while connecting db ", err);
          cb(err,'nok');
          return;
        }
        con.query('USE restapi');
        con.query('INSERT INTO ' + tableName + ' SET ?', data, function (err, rows) {
          if (!err) {
            con.release();
            cb(err,'ok');
            return;
          } else {
          con.release();
          logger.error("Restapi :: Error function saveData in update query:",err);
          cb(err,'nok');
          return;
          }
        });
      });
    } catch(err) {
      logger.error('Restapi ::  Rrror in function saveData :', err);
      cb(err,'nok');
      return;
    }
  },

  isUserIdTaken: function(userId, tableName, cb) {
    logger.info('Restapi :: isUserIdTaken method input params :: ' + JSON.stringify(userId) + ' for table :: ' + tableName);
    var pool = require('../config/database')();
    try {
      var con = pool.getConnection(function(err, con) {
        if (err) {
          logger.error("Restapi :: Error in isUserIdTaken while connecting db ", err);
          cb(err,'nok');
          return;
        }
        con.query('USE ' + constants.DB_DATABASE);
        con.query('SELECT * FROM ' + tableName + ' WHERE user_id = ' + con.escape(userId), function (err, rows) {
          if (!err) {
            if(rows.length > 0) {
              con.release();
              var result = {"is_registered": true};
              cb(err, result);
              return;
            } else {
              con.release();
              var result = {"is_registered": false};
              cb(err, result);
              return;
            }
          } else {
            con.release();
            logger.error("Error in isUserIdTaken function :", err);
            cb(err, 'nok');
            return;
          }
        });
      });
    } catch(err) {
      logger.error('Restapi :: Catch :: Error in function isUserIdTaken :', err);
      cb(err, 'nok');
      return;
    }
  },

  isEmailAlreadyInUse: function(emailId, tableName, cb) {
    logger.info('Restapi :: isEmailAlreadyInUse method input params :: ' + JSON.stringify(emailId) + ' for table :: ' + tableName);
    var pool = require('../config/database')();
    try {
      var con = pool.getConnection(function(err, con) {
        if (err) {
          logger.error("Restapi :: Error in isEmailAlreadyInUse while connecting db ", err);
          cb(err,'nok');
          return;
        }
        con.query('USE ' + constants.DB_DATABASE);
        con.query('SELECT * FROM ' + tableName + ' WHERE email_id = ' + con.escape(emailId), function (err, rows) {
          if (!err) {
            if(rows.length > 0) {
              con.release();
              var result = {"is_registered": true};
              cb(err, result);
              return;
            } else {
              con.release();
              var result = {"is_registered": false};
              cb(err, result);
              return;
            }
          } else {
            con.release();
            logger.error("Error in isEmailAlreadyInUse function :", err);
            cb(err, 'nok');
            return;
          }
        });
      });
    } catch(err) {
      logger.error('Restapi :: Catch ::  Error in function isEmailAlreadyInUse :', err);
      cb(err, 'nok');
      return;
    }
  },

  isMobileNumberAlreadyInUse: function(mobileNumber, tableName, cb) {
    logger.info('Restapi :: isMobileNumberAlreadyInUse method input params :: ' + JSON.stringify(mobileNumber) + ' for table :: ' + tableName);
    var pool = require('../config/database')();
    try {
      var con = pool.getConnection(function(err, con) {
        if (err) {
          logger.error("Restapi :: Error in isMobileNumberAlreadyInUse while connecting db ", err);
          cb(err,'nok');
          return;
        }
        con.query('USE ' + constants.DB_DATABASE);
        con.query('SELECT * FROM ' + tableName + ' WHERE mobile_number = ' + con.escape(mobileNumber), function (err, rows) {
          if (!err) {
            if(rows.length > 0) {
              con.release();
              var result = {"is_registered": true};
              cb(err, result);
              return;
            } else {
              con.release();
              var result = {"is_registered": false};
              cb(err, result);
              return;
            }
          } else {
            con.release();
            logger.error("Restapi :: Error in isMobileNumberAlreadyInUse function :", err);
            cb(err, 'nok');
            return;
          }
        });
      });
    } catch(err) {
      logger.error('Restapi :: Catch :: Error in function isMobileNumberAlreadyInUse :', err);
      cb(err, 'nok');
      return;
    }
  },

  userException : function(message) {
    this.message = message;
    this.name = 'UserException';
  }
};