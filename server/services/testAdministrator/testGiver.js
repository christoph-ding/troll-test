var u = require('./utils/testing.js');
 
// this closure is so the final function can access the response object without needing to pass it all the way down
var generateClosure = function(req, res, cb) {
  return function(data) {
    res.writeHead({"Content-Type": "application/json"});
    res.write(data);
    res.status(200);
    cb();
  };
}

var getTest = function(req, res, cb) {  
  newCallBack = generateClosure(req, res, cb);
  u.getListOfAllSampleData(newCallBack);
}

module.exports = {
  getTest: getTest
}
