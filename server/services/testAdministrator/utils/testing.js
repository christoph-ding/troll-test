var fs = require('fs');
var path = require('path');

var testDataDirectory = path.join(__dirname, '../data/');
/*
  TABLE OF CONTENTS FOR THIS FILE
  use ctrl + F on number to jump to

  1.  General Utility Functions
  2.  Functions for generating test
  3.  Functions for checking user submitted test

*/

// 1. GENERAL UTILITY FUNCTIONS

// the words in the chosen file may have punctuation and escapes and capitalization
// let's clean and format the words so that 'Eat', eat', 'eat.' and 'eat\n' are all counted as the same word
var standardizeString = function(string) {
  // remove escapes and new lines
  var cleanedString = string.replace(/[\r\n]/g, "");
  // remove punctuation
  cleanedString = cleanedString.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,"");
  // remove variant capitalization
  cleanedString = cleanedString.toLowerCase();
  return cleanedString;
}

// 2. FUNCTIONS FOR GENERATING TEST
var getListOfAllSampleData = function(cb) {
  fs.readdir(testDataDirectory, function(err, items) {
    if (err) {
      throw err;
    } else {
      // we do not want the hidden, folder files, such as .DSStore
      var isTextFile = function(file) {
        return file.includes('.txt');
      }

      var sampleTexts = items.filter(isTextFile);      
      readRandomFileContents(sampleTexts, cb);
    }
  });
}

// Choose a random file, and then read its contents
var readRandomFileContents = function (files, cb) {
  var sampleTextFile = files[selectRandomIndex(files)];
  var sampleTextPath = path.join(testDataDirectory, sampleTextFile);

  fs.readFile(sampleTextPath, 'utf-8', function(err, originalContent) {
    if (err) {
      throw err;
    } else {
      generateTest(originalContent, cb);
    }
  });
}

var generateTest = function(originalContent, cb) {
  // variable "original Content" is all the words in the sampleTextFile, unformatted,
  // variable "uniqueStandardWords" is a list of the unique words, cleaned of punctation, escapes and made case-consistent.
  // we will use "uniqueStandardWords" to decide what words should be excluded in the test
  var uniqueStandardWords = getStandardUniqueWords(originalContent);
  var excludedWords = selectExcludedWords(uniqueStandardWords);
  var JSONTest = createJSONResponse(originalContent, excludedWords);

  cb(JSONTest);
}


// we want to have a list of the unique, standarized words in the content, to easily generate a list of words the user should exclude
var getStandardUniqueWords = function(content) {
  var standardizeAndCheckUnique = function(string) {
    var standarizedString = standardizeString(string);
    if (!(standarizedString in uniqueWordsHash)) {
      uniqueWordsHash[standarizedString] = true;
    } 
  }

  // the Hash and Array are simply used in this function to get unique words quickly, they are NOT output
  var uniqueWordsHash = {};
  var contentAsArray = content.split(' ');

  contentAsArray.forEach(standardizeAndCheckUnique);
  return Object.keys(uniqueWordsHash);
}

var selectRandomIndex = function(myArray) {
  var randIndex = Math.floor(Math.random() * myArray.length);
  return randIndex;
}

// choose a random number of words from the standardized, unique words in the test content to exclude
var selectExcludedWords = function(wordList) {
  // texts with only one unique word should use an empty list
  if (wordList.length === 1) {
    return [];  
  }
  // Otherwise, we create a list of some but not all words in that body of text

  // make a copy to preserve itegrity of original list
  // we want to 'destroy' the elements in the copy, so that we do not choose multiples of the same word by accident
  var copyWordList = wordList.slice();
  var excludedWords = [];

  var numberToExclude = selectRandomIndex(wordList) + 1;
  // 'reroll' until we get a number that is less than all words
  while (numberToExclude === copyWordList.length) {
    numberToExclude = selectRandomIndex(wordList) + 1;    
  }

  while (numberToExclude--) {
    var excludedWordIndex = selectRandomIndex(copyWordList);
    excludedWords.push(copyWordList[excludedWordIndex]);
    // remove the excluded word from the list of potential words, to avoid awkward repeats
    copyWordList.splice(excludedWordIndex, 1);
  }

  return excludedWords;
}

var createJSONResponse = function(originalContent, excludedWords) {
  var json = JSON.stringify({
    passage: originalContent, 
    exclude: excludedWords
    })
  return json;
}

// 3. FUNCTIONS FOR CHECKING TEST
var checkTest = function(req) {
  // 1.  parse the JSON data into the form we want to use for the rest of the functions
  var userTest = parseJSON(req);

  var passage = userTest[0];
  var exclude = userTest[1];
  var frequency = userTest[2];

  // 2.  generate the correct answer from that JSON
  var correctFrequency = generateCorrectFrequency(passage, exclude, frequency);

  // 3.  compare the user answer and the correct answer
  var answerIsCorrect = checkAnswer(frequency, correctFrequency);

  return answerIsCorrect;
}

var parseJSON = function(req) {
  var submittedTest = req.body;
  // This is my interpretation of the prompt description of what the request will have
  // 'A body of text'
  var passage = submittedTest['passage'].split(' ');

  // make the list of the excluded words into a hash for easy lookup
  var excludeHash = {};
  submittedTest['exclude'].forEach(function (item) {
    excludeHash[item] = true;
  });

  // 'A count of the frequency of every word in the body of text excluding words from the list'
  var frequencyHash = submittedTest['frequency'];
  return [passage, excludeHash, frequencyHash];
}

// the words in the chosen file may have punctuation and escapes and capitalization
// let's clean and format the words so that 'Eat', eat', 'eat.' and 'eat\n' are all counted as the same word
var standardizeString = function(string) {
  // remove escapes and new lines
  var cleanedString = string.replace(/[\r\n]/g, "");
  // remove punctuation
  cleanedString = cleanedString.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,"");
  // remove variant capitalization
  cleanedString = cleanedString.toLowerCase();
  return cleanedString;
}

var generateCorrectFrequency = function(passage, exclude, frequencyHash) {

  var correctFrequency = {};

  var addToFrequencey = function(word) {
    if (!(word in correctFrequency)) {
      correctFrequency[word] = 1;
    } else {
      correctFrequency[word]++;
    }
  }

  var determineFrequency = function(item) {
    var standardizedWord = standardizeString(item);
    // count the word if it is not supposed to be excluded
    if (!(standardizedWord in exclude)) {
      addToFrequencey(standardizedWord);
    }
  };

  passage.forEach(determineFrequency);

  return correctFrequency;
}

var checkAnswer = function(userSubmission, correctAnswer) {
  var checkFrequency = function(word) {
    var userFrequency = userSubmission[word];
    var correctFrequency = correctAnswer[word];
    return userFrequency === correctFrequency;
  }

  // is every answer correct?
  if (Object.keys(userSubmission).every(checkFrequency)) {
    return true;
  }
  return false;
}

module.exports = {
  getListOfAllSampleData: getListOfAllSampleData,
  checkTest: checkTest
}
