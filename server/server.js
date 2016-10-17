var express = require('express');

var app = express();

var port = 8000;

var server = app.listen(port, function() {
  console.log('Listening');
});

require('./middleware.js')(app, express);

module.exports = server;
