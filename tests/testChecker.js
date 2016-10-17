var should = require('should');
var request = require('supertest');

describe('Test Giver', function() {
  // hook to set up a server
  var app;
  before(function () {
      app = require('../server/server.js');
  });
  after(function () {
      app.close();
  });

  // Test the router returns the correct json object with the test
  it('responds with a JSON object', function testSlash(done) {
    request(app)
      .get('/test')
      .expect('Content-Type', 'application/json', done)
  });

  it('responds with a JSON object that has a string passage', function testSlash(done) {
    request(app)
      .get('/test')
      .end(function(err, result) {
        result.body.should.have.property('passage');
        result.body['passage'].should.be.a.String;
        done()
      })
  });

  it('responds with a JSON object that has a exclude list', function testSlash(done) {
      request(app)
        .get('/test')
        .end(function(err, result) {
          result.body.should.have.property('exclude');
          result.body['exclude'].should.be.an.Array;
          done()
        })
  });
});
