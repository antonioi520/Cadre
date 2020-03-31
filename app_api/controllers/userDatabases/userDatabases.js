// Include required modules
var userDatabasesDao = require('../../services/userDatabases/userDatabasesDao');

// Handle JSON responses
function sendJSONresponse(res, status, content) {
  res.status(status);
  res.json(content);
}

/*
 * Controller used to create User Databases
 * Invoked after creating a Viewsite
 */
function userDatabasesCreate(request, response) {
  userDatabasesDao.userDatabasesCreate(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to delete User Databases
 * Invoked after deleting a Viewsite
 */
function userDatabasesDelete(request, response) {
  userDatabasesDao.userDatabasesDelete(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

// Export controller methods
module.exports.userDatabasesCreate = userDatabasesCreate;
module.exports.userDatabasesDelete = userDatabasesDelete;
