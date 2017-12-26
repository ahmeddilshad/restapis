var logger = require('./winston_logging');
var db = require('./database').db;

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
          logger.error("Restapi :: Error in update_status while connecting db ", err);
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
          logger.error("Restapi :: Error function status_update in update query:",err);
          cb(err,'nok');
          return;
          }
        });
      });
    } catch(err) {
      logger.error('Restapi ::  error in function saveData :', err);
      cb(err,'nok');
      return;
    }
  }
};