var fs = require('fs');
var path = require('path');


var testDataDirectory = path.join(__dirname, '/data/');

// Choosing a dataset
var chooseDataSet = function(req, res, next) {
  // console.log('choosing a dataset!');
  readDataFiles(readRandomFile);
}

var readDataFiles = function(next) {
  // console.log('fetching the dataFiles');
  fs.readdir(testDataDirectory, function(err, items) {
    if (err) {
      throw err;
    } else {
      // we do not want the hidden, folder files, such as .DSStore
      var isTextFile = function(file) {
        return file.includes('.txt');
      }
      var sampleTexts = items.filter(isTextFile);

      next(sampleTexts);
    }
  });
}

var readRandomFile = function (files) {
  // console.log('choosing a file to test you with...');
  var sampleTextName = files[Math.floor(Math.random() * files.length)];
  var sampleTextPath = path.join(testDataDirectory, sampleTextName);

  console.log(sampleTextPath);

  fs.readFile(sampleTextPath, 'utf-8', function(err, content) {
    if (err) {
      throw err;
    } else {
      console.log(content);
    }
  });


}

var selectExcludedWords = function(req, res, next) {

}

var createJSONResponse = function(req, res, next) {

}

module.exports = {
  chooseDataSet: chooseDataSet
}
