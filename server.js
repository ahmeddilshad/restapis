const express = require('express'),
      app = express(),
      fs = require('fs'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      common =  require('./config/common');

var accessLogStream = fs.createWriteStream('/var/log/restapis/access.log',{flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.all('/*', function(req, res, next) {
  //Content-Type validation
  var contentType = req.headers["content-type"];
  if (contentType == "undefined" || contentType != "application/json") {
    content = {"error" : "Content-type is not acceptable!"};
    common.sendJSONresponse(res, 400, content);
    return;
  }
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});
// app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
//define routes
app.use('/', require('./config/index'));
// If no route is matched by now, it must be a 404
// app.use(function(req, res) {
//   common.sendJSONresponse(res,404,{"message":"Not Found"});
// });
app.listen(3000, function() {
    console.log('Server is runnig at http://localhost:3000');
});