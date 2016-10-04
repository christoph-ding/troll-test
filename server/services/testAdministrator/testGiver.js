var testFunction = function(req, res) {
  res.status(200);
  res.send('heya!  you just made a get request to the testRouter\n');
}

module.exports = {
  testFunction: testFunction
}
