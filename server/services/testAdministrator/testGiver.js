var fs = require('fs');
var path = require('path');

var testDataDirectory = path.join(__dirname, '/data/');

// Choosing a dataset
var chooseDataSet = function(req, res, next) {
  readDataFiles(next);
}

// Get all the possible sample texts from the sample data diectory
var readDataFiles = function(next) {
  fs.readdir(testDataDirectory, function(err, items) {
    if (err) {
      throw err;
    } else {
      // we do not want the hidden, folder files, such as .DSStore
      var isTextFile = function(file) {
        return file.includes('.txt');
      }
      var sampleTexts = items.filter(isTextFile);      
      readRandomFileContents(sampleTexts, next);
    }
  });
}

// Choose a random file, and then read its contents
var readRandomFileContents = function (files, next) {
  var sampleTextName = files[Math.floor(Math.random() * files.length)];
  var sampleTextPath = path.join(testDataDirectory, sampleTextName);

  fs.readFile(sampleTextPath, 'utf-8', function(err, content) {
    if (err) {
      throw err;
    } else {
      // variable "original Content" is all the words in the sample data file, unformatted,
      // variable "uniqueWords" is a list of the unique words, cleaned of punctation, escapes and made case-consistent.
      // we will use "uniqueWords" to decide what words should be excluded in the test
      var originalContent = content;
      var cleanedWords = cleanWords(content);
      var uniqueWords = getUniqueWords(cleanedWords);

      console.log(uniqueWords);
      next();
    }
  });
}

// the words in the chosen file may have punctuation and escapes and capitalization
// let's clean and format the words so that 'Eat', eat', 'eat.' and 'eat\n' are all counted as the same word
var cleanWords = function(content) {

  var standardizeString = function(string, index, array) {
    // remove escapes and new lines
    var cleanedString = string.replace(/[\r\n]/g, "");
    // remove punctuation
    cleanedString = cleanedString.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,"");
    // remove variant capitalization
    cleanedString = cleanedString.toLowerCase();
    array[index] = cleanedString;
  }

  var splitWords = content.split(' ');  
  splitWords.forEach(standardizeString);
  return splitWords;
}

var getUniqueWords = function(content) {

  var checkUnique = function(string) {
    if (!(string in uniqueWordsHash)) {
      uniqueWordsHash[string] = true;
    } 
  }

  // the Hash is simply used in this function to get unique words quickly, it is NOT the output
  var uniqueWordsHash = {};
  content.forEach(checkUnique);
  return Object.keys(uniqueWordsHash);
}

var selectExcludedWords = function(content) {
  console.log('selecting some subset of words to exclude...');
  var splitWords = content.split(' ');
  console.log(splitWords);
}

var createJSONResponse = function(req, res, next) {

}

module.exports = {
  chooseDataSet: chooseDataSet
}
