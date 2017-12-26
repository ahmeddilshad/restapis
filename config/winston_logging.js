var winston = require('winston'),
    logger = new (winston.Logger)({
  transports: [
    //new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({filename: '/var/log/restapis/dilshad.log', json: false })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: '/var/log/restapis/exceptions.log', json: false })
  ],
  exitOnError: false
});
module.exports = logger;
