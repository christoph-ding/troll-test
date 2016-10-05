var testFunction = function(req, res) {
  res.status(200);
  res.send('heya!  you just made a get request to get the test\n');
}

module.exports = {
  testFunction: testFunction
}
