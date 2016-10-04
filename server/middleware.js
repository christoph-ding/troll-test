var morgan = require('morgan');

module.exports = function(app, express) {
  app.use(morgan('dev'));
}
