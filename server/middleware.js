var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.json());

  var testRouter = require('./routers/testRouter.js')(express);
  app.use('/test', testRouter);
}
