// Include required modules
var viewpagesDao = require('../../services/viewsites/viewpagesDao');

// Handle JSON responses
function sendJSONresponse(res, status, content) {
  res.status(status);
  res.json(content);
}

/*
 * Controller used to create a Viewpage
 */
function viewpagesCreate(request, response) {
  viewpagesDao.viewpagesCreate(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to update an existing Viewpage
 */
function viewpagesUpdate(request, response) {
  viewpagesDao.viewpagesUpdate(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

/*
 * Controller used to delete an existing Viewpage
 */
function viewpagesDelete(request, response) {
  viewpagesDao.viewpagesDelete(request)
  .then(function(results) {
    sendJSONresponse(response, 200, results);
  }, function(error) {
    sendJSONresponse(response, 404, error);
  });
}

// Export controller methods
module.exports.viewpagesCreate = viewpagesCreate;
module.exports.viewpagesUpdate = viewpagesUpdate;
module.exports.viewpagesDelete = viewpagesDelete;
