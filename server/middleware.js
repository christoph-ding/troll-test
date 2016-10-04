var morgan = require('morgan');

module.exports = function(app, express) {
  app.use(morgan('dev'));

  var testRouter = require('./routers/testRouter.js')(express);
  app.use('/test', testRouter);
}
