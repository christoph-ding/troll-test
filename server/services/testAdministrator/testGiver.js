var testFunction = function(req, res) {
  res.status(200);
  res.send('heya!  you just made a get request to get the test\n');
}

var chooseDataSet = function(req, res, next) {

}

var selectExcludedWords = function(req, res, next) {

}

var createJSONResponse = function(req, res, next) {

}

module.exports = {
  testFunction: testFunction
}
