var constant = require('./constants');
var logger = require('./winston_logging');
var mysql = require('mysql');

module.exports = function handle_db(req, res) {
  var pool = mysql.createPool({
              connectionLimit: 10,
              host: constant.DB_HOST,
              user: constant.DB_USER,
              password: constant.DB_PASSWORD});
  pool.getConnection(function (err, connection) {
    if (err) {
      logger.error("This is error msg, when connecting to db: " + err);
      return(err);
    }
    logger.info("from db config: connected as id: " + connection.threadId);
    connection.on('error', function (err) {
      return({ "code": 100, "status": "Error in connection database" });
    });
    return connection;
  });
return pool;
};
