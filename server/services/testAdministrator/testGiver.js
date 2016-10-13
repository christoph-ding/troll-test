var fs = require('fs');
var path = require('path');


// Choosing a dataset
var chooseDataSet = function(req, res, next) {
  console.log('choosing a dataset!');
  readDataFiles(next);
}

var readDataFiles = function(next) {
  console.log('fetching the dataFiles');
  fs.readdir(path.join(__dirname ,'/data/'), function(err, items) {
    if (err) {
      throw err;
    } else {
      // we do not want the hidden, folder files, such as .DSStore
      var isTextFile = function(file) {
        return file.includes('.txt');
      }

      var sampleTexts = items.filter(isTextFile);

      console.log(sampleTexts);
      next(sampleTexts, function() {
        console.log('goodbye!');
      });
    }
  });
}

var chooseRandomFile = function (files, next) {

  next();
}
  


var selectExcludedWords = function(req, res, next) {

}

var createJSONResponse = function(req, res, next) {

}

module.exports = {
  chooseDataSet: chooseDataSet
}
