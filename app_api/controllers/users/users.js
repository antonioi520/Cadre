// Include required modules
var usersDao = require('../../services/users/usersDao');

// Handle JSON responses
function sendJSONresponse(res, status, content) {
  res.status(status);
  res.json(content);
}

/*
 * Controller used to look up an active session
 */
function usersReadOne(request, response) {
  usersDao.usersReadOne(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to create new Users
 */
function usersCreate(request, response) {
  usersDao.usersCreate(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to update existing Users
 */
function usersUpdate(request, response) {
  usersDao.usersUpdate(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to delete existing Users
 */
function usersDelete(request, response) {
  usersDao.usersDelete(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to create a new session
 */
function usersLogIn(request, response) {
  usersDao.usersLogIn(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to destroy an active session
 */
function usersLogout(request, response) {
  usersDao.usersLogout(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

// Export controller methods
module.exports.usersReadOne = usersReadOne;
module.exports.usersCreate = usersCreate;
module.exports.usersUpdate = usersUpdate;
module.exports.usersDelete = usersDelete;
module.exports.usersLogIn = usersLogIn;
module.exports.usersLogout = usersLogout;
