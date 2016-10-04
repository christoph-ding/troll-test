var testGiver = require('../services/testAdministrator/testGiver');

module.exports = function(express) {
  var testRouter = express.Router();

  testRouter.get('/', testGiver.testFunction);

  return testRouter;
}
