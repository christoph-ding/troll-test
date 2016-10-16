var checkTest = function(req, res, next) {
  // 1.  parse the JSON data into the form we want to use for the rest of the functions
  var userTest = parseJSON(req);

  var passage = userTest[0];
  var exclude = userTest[1];
  var frequency = userTest[2];

  // 2.  generate the correct answer from that JSON
  var correctFrequency = generateCorrectFrequency(passage, exclude, frequency);

  // 3.  compare the user answer and the correct answer
  var answerIsCorrect = checkAnswer(frequency, correctFrequency);

  // 4.  create the response
  if (answerIsCorrect) {
    res.status(200);
  } else {
    res.status(400);
  }

  next();
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
  checkTest: checkTest
}
