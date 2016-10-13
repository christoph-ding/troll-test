var testFunction = function(req, res) {
  console.log('your request is:', req.body);
  res.status(200);
  res.send('You just submitted your answer!\n');
}

var receiveAnswer = function(req, res, next) {

}

var generateCorrectAnswer = function(req, res, next) {

}

var checkAnswer = function(req, res, next) {

}

var returnAnswer = function(req, res, next) {
  
}

module.exports = {
  testFunction: testFunction
}
