var winston = require('winston'),
    logger = new (winston.Logger)({
  transports: [
    //new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({filename: '/var/log/restapi/dilshad.log', json: false })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: '/var/log/restapi/exceptions.log', json: false })
  ],
  exitOnError: false
});
module.exports = logger;
