// Include required modules
var userTablesDao = require('../../services/userDatabases/userTablesDao');

// Handle JSON responses
function sendJSONresponse(res, status, content) {
  res.status(status);
  res.json(content);
}

/*
 * Controller used to read and individual User Table
 */
function userTablesReadOne(request, response) {
  userTablesDao.userTablesReadOne(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to read a list of User Tables
 */
function userTablesReadAll(request, response) {
  userTablesDao.userTablesReadAll(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to create User Tables
 * Invoked after creating a Form Element
 */
function userTablesCreate(request, response) {
  userTablesDao.userTablesCreate(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to delete User Tables
 * Invoked after deleting a Form Element
 */
function userTablesDelete(request, response) {
  userTablesDao.userTablesDelete(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

// Export controller methods
module.exports.userTablesReadOne = userTablesReadOne;
module.exports.userTablesReadAll = userTablesReadAll;
module.exports.userTablesCreate = userTablesCreate;
module.exports.userTablesDelete = userTablesDelete;
