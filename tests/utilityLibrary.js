var should = require('should');
var u = require('../server/services/testAdministrator/utils/testing.js');
var path = require('path');

describe('Utility Library', function() {

  describe('Test Generation', function() {    
    // we need to get a sample test from the server, but without calling the server
    var generatedTest;
    var sampleDataDir = path.join(__dirname + '/data/');

    beforeEach(function(done) {
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
});
