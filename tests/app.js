var request = require('supertest');

describe('server', function() {
  var app;
  before(function () {
      app = require('../server/server.js');
  });
  after(function () {
      app.close();
  });

  it('responds 200 to requests to /test', function testSlash(done) {
    request(app)
      .get('/test')
      .expect(200, done);
  });

  it('responds 404 everything else', function testPath(done) {
    request(app)
      .get('/some/other/path')
      .expect(404, done);
  });

});
