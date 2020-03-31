// Include required modules
var userUsersDao = require('../../services/userDatabases/userUsersDao');

// Handle JSON responses
function sendJSONresponse(res, status, content) {
  res.status(status);
  res.json(content);
}

/*
 * Controller used to look up an active session
 */
function userUsersReadOne(request, response) {
  userUsersDao.userUsersReadOne(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to look up all Users
 */
function userUsersReadAll(request, response) {
  userUsersDao.userUsersReadAll(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to create new Users
 */
function userUsersCreate(request, response) {
  userUsersDao.userUsersCreate(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to update existing Users
 */
function userUsersUpdate(request, response) {
  userUsersDao.userUsersUpdate(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to delete existing Users
 */
function userUsersDelete(request, response) {
  userUsersDao.userUsersDelete(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to create a new session
 */
function userUsersLogin(request, response) {
  userUsersDao.userUsersLogin(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to destroy an active session
 */
function userUsersLogout(request, response) {
  userUsersDao.userUsersLogout(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

// Export controller methods
module.exports.userUsersReadOne = userUsersReadOne;
module.exports.userUsersReadAll = userUsersReadAll;
module.exports.userUsersCreate = userUsersCreate;
module.exports.userUsersUpdate = userUsersUpdate;
module.exports.userUsersDelete = userUsersDelete;
module.exports.userUsersLogin = userUsersLogin;
module.exports.userUsersLogout = userUsersLogout;
