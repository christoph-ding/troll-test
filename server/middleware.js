var morgan = require('morgan');
var bodyParser = require('body-parser');

var endReqResCycle = function(req, res) {
  res.end();
}

module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.json());

  var testRouter = require('./routers/testRouter.js')(express);

  app.use('/test', testRouter, endReqResCycle);
}
