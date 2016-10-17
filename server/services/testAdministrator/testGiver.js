var u = require('./utils/testing.js');
var path = require('path');
 
// this closure is so the final function can access the response object without needing to pass it all the way down
var generateClosure = function(req, res, cb) {
  return function(data) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(data);
    cb();
  };
}

var getTest = function(req, res, cb) {
  var testDataDirectory = path.join(__dirname, '../testAdministrator/data/');
  newCb = generateClosure(req, res, cb);
  u.getValidSampleData(testDataDirectory, newCb);
}

module.exports = {
  getTest: getTest
}
