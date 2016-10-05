var testFunction = function(req, res) {
  console.log('your request is:', req.body);
  res.status(200);
  res.send('You just submitted your answer!\n');
}

module.exports = {
  testFunction: testFunction
}
