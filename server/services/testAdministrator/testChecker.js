var checkTest = function(req, res, next) {
  console.log('checkTest');
  // 1.  parse the JSON data
  var userTest = parseJSON(req);

  var passage = userTest[0];
  var exclude = userTest[1];
  var frequency = userTest[2];

  // 2.  generate the correct answer from that JSON
  var correctFrequency = generateCorrectFrequency(passage, exclude, frequency);
  console.log(correctFrequency);

  // 3.  compare the two

  // 4.  create the response

  next();
}

var parseJSON = function(req) {
  var submittedTest = req.body;
  // This is my interpretation of the prompt description of what the request will have
  // 'A body of text'
  var passage = submittedTest['passage'];

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

  var compareStandardizedWord = function(item) {
    // we need to make sure that we can filter words out, even after inconsistencies in punctuation and escapes and capitalization
    var standardizedString = standardizeString(item);
    if (!(standardizedString in exclude)) {
      passageWithoutExcludedWords.push(item);
    }
  }

  // generate the correct answer
  var passageArray = passage.split(' ');
  var passageWithoutExcludedWords = [];

  passageArray.forEach(compareStandardizedWord);

  return passageWithoutExcludedWords;
}




var checkAnswer = function(req, res, next) {

}

var returnAnswer = function(req, res, next) {
  
}

module.exports = {
  checkTest: checkTest
}
