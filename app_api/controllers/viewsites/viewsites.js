// Include required modules
var viewsitesDao = require('../../services/viewsites/viewsitesDao');

// Handle JSON responses
function sendJSONresponse(res, status, content) {
  res.status(status);
  res.json(content);
}

/*
 * Controller used to get top-level information on a User's Viewsites
 */
function viewsitesReadAll(request, response) {
  viewsitesDao.viewsitesReadAll(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to read a Viewsite
 */
function viewsitesReadOne(request, response) {
  viewsitesDao.viewsitesReadOne(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to create a Viewsite
 */
function viewsitesCreate(request, response) {
  viewsitesDao.viewsitesCreate(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to update a Viewsite
 */
function viewsitesUpdate(request, response) {
  viewsitesDao.viewsitesUpdate(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to delete a Viewsite
 */
function viewsitesDelete(request, response) {
  viewsitesDao.viewsitesDelete(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

// Export controller methods
module.exports.viewsitesReadAll = viewsitesReadAll;
module.exports.viewsitesReadOne = viewsitesReadOne;
module.exports.viewsitesCreate = viewsitesCreate;
module.exports.viewsitesUpdate = viewsitesUpdate;
module.exports.viewsitesDelete = viewsitesDelete;
