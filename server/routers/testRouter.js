var testGiver = require('../services/testAdministrator/testGiver.js');
var testChecker = require('../services/testAdministrator/testChecker.js');

module.exports = function(express) {
  var testRouter = express.Router();

  testRouter.get('/', testGiver.testFunction);
  testRouter.post('/', testChecker.testFunction);

  return testRouter;
}
