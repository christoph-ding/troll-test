var should = require('should');
var u = require('../server/services/testAdministrator/utils/testing.js');
var path = require('path');

describe('Utility Library', function() {

  describe('standardizeString', function() {
    it ('cleans punctuation', function() {
      var nonStandardString = 'hello!';
      var standardizedString = u.standardizeString(nonStandardString);
      standardizedString.should.eql('hello');
    })

    it ('formats upper and lowercase', function() {
      var nonStandardString = 'HeLLo';
      var standardizedString = u.standardizeString(nonStandardString);
      standardizedString.should.eql('hello');
    })

    it ('cleans escapes', function() {
      var nonStandardString = 'hello\n';
      var standardizedString = u.standardizeString(nonStandardString);
      standardizedString.should.eql('hello');
    })
  })

  describe('Test Generation', function() {    
    // we need to get a sample test from the server, but without calling the server
    var generatedTest;
    var sampleDataDir = path.join(__dirname + '/data/');

    before(function(done) {
      var setGeneratedTest = function(test) {
        generatedTest = JSON.parse(test);
        done();
      }
      // set the generatedTest that will be used throughout this test
      u.getValidSampleData(sampleDataDir, setGeneratedTest);
    });

    it('reads the contents of a text file', function() {
      generatedTest.passage.should.eql('this is the test passage\n');
    });

    it('should not choose all the words to exclude', function() {
      generatedTest.exclude.length.should.not.eql(5);
    });
  })

  describe('Test Checking', function() {
    it('should return true if the test is correct', function() {
      var userRequest = {
        body: {
          passage: 'this is a passage',
          exclude: ['this'],
          frequency: { 'is': 1, 'a': 1, 'passage': 1 }
        }
      }
      var isUserCorrect = u.checkTest(userRequest);
      isUserCorrect.should.eql(true);
    })

    it('should return false if the test is incorrect', function() {
      var userRequest = {
        body: {
          passage: 'this is a passage',
          exclude: ['this'],
          frequency: { 'is': 1, 'a': 1, 'passage': 3 }
        }
      }
      var isUserCorrect = u.checkTest(userRequest);
      isUserCorrect.should.eql(false);
    })

    it('should not care what order the user chooses to put his keys for the word / frequency in the request', function() {
      var userRequest = {
        body: {
          passage: 'this is a passage',
          exclude: ['this'],
          frequency: { 'a': 1, 'passage': 1, 'is': 1}
        }
      }
      var isUserCorrect = u.checkTest(userRequest);
      isUserCorrect.should.eql(true);

    })

    it('should handle complicated passages', function() {
      var userRequest = {
        body: {
          passage: 'this is a passage. this PassAGE! is weird... is this PassAGE weird?',
          exclude: ['this', 'is', 'a'],
          frequency: { 'passage': 3, 'weird': 2 }
        }
      }
      var isUserCorrect = u.checkTest(userRequest);
      isUserCorrect.should.eql(true);
    })
  })

});
