// Include required modules
var userRecordsDao = require('../../services/userDatabases/userRecordsDao');

// Handle JSON responses
function sendJSONresponse(res, status, content) {
  res.status(status);
  res.json(content);
}

/*
 * Controller used to create Records
 */
function userRecordsCreate(request, response) {
  userRecordsDao.userRecordsCreate(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to update existing Records
 */
function userRecordsUpdate(request, response) {
  userRecordsDao.userRecordsUpdate(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to delete existing Records
 */
function userRecordsDelete(request, response) {
  userRecordsDao.userRecordsDelete(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

// Export controller methods
module.exports.userRecordsCreate = userRecordsCreate;
module.exports.userRecordsUpdate = userRecordsUpdate;
module.exports.userRecordsDelete = userRecordsDelete;
