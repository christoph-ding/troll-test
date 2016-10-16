var u = require('./utils/testing.js');

var checkTest = function(req, res, cb) {
  var answerIsCorrect = u.checkTest(req);
  if (answerIsCorrect) {
    res.status(200);
  } else {
    res.status(400);
  }
  cb();
}

module.exports = {
  checkTest: checkTest
}
