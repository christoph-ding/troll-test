var morgan = require('morgan');
var bodyParser = require('body-parser');

// general callbacks for the app, regardless of path
var invalidPath = function(req, res, cb) {
  res.status(404);
  res.write('that path is not valid!');
  cb();
}

var endReqResCycle = function(req, res) {
  res.end('\n');
}


module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.json());

  var testRouter = require('./routers/testRouter.js')(express);

  app.use('/test', testRouter, endReqResCycle);

  // if the path is not a defined route, a 404 will be returned
  app.use(invalidPath, endReqResCycle);
}
