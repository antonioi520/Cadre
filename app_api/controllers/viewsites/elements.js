// Include required modules
var textDao = require('../../services/viewsites/textDao');
var formsDao = require('../../services/viewsites/formsDao');
var dataViewsDao = require('../../services/viewsites/dataViewsDao');
var imagesDao = require('../../services/viewsites/imagesDao');
//var numberDao = require('../../services/viewsites/numberDao');

// Handle JSON responses
function sendJSONresponse(res, status, content) {
  res.status(status);
  res.json(content);
}

/*
 * Controller used to create Elements
 */
function elementsCreate(request, response) {
  if(request.body.kind === "text") {
    textDao.textCreate(request)
    .then(function(results) {
      sendJSONresponse(response, 200, results);
    }, function(error) {
      sendJSONresponse(response, 404, error);
    });
  } else if(request.body.kind === "form") {
    formsDao.formsCreate(request)
    .then(function(results) {
      sendJSONresponse(response, 200, results);
    }, function(error) {
      sendJSONresponse(response, 404, error);
    });
  } else if(request.body.kind === "dataView") {
    dataViewsDao.dataViewsCreate(request)
    .then(function(results) {
      sendJSONresponse(response, 200, results);
    }, function(error) {
      sendJSONresponse(response, 404, error);
    });
  } else if(request.body.kind === "image") {
    imagesDao.imagesCreate(request)
    .then(function(results) {
      sendJSONresponse(response, 200, results);
    }, function(error) {
      sendJSONresponse(response, 404, error);
    });
  }
}

/*
 * Controller used to update Elements
 */
function elementsUpdate(request, response) {
  if(request.body.kind === "text") {
    textDao.textUpdate(request)
    .then(function(results) {
      sendJSONresponse(response, 200, results);
    }, function(error) {
      sendJSONresponse(response, 404, error);
    });
  } else if(request.body.kind === "form") {
    formsDao.formsUpdate(request)
    .then(function(results) {
      sendJSONresponse(response, 200, results);
    }, function(error) {
      sendJSONresponse(response, 404, error);
    });
  } else if(request.body.kind === "dataView") {
    dataViewsDao.dataViewsUpdate(request)
    .then(function(results) {
      sendJSONresponse(response, 200, results);
    }, function(error) {
      sendJSONresponse(response, 404, error);
    });
  } else if(request.body.kind === "image") {
    imagesDao.imagesUpdate(request)
    .then(function(results) {
      sendJSONresponse(response, 200, results);
    }, function(error) {
      sendJSONresponse(response, 404, error);
    });
  }
}

/*
 * Controller used to delete Elements
 */
function elementsDelete(request, response) {
  if(request.body.kind === "text") {
    textDao.textDelete(request)
    .then(function(results) {
      sendJSONresponse(response, 200, results);
    }, function(error) {
      sendJSONresponse(response, 404, error);
    });
  } else if(request.body.kind === "form") {
    formsDao.formsDelete(request)
    .then(function(results) {
      sendJSONresponse(response, 200, results);
    }, function(error) {
      sendJSONresponse(response, 404, error);
    });
  } else if(request.body.kind === "dataView") {
    dataViewsDao.dataViewsDelete(request)
    .then(function(results) {
      sendJSONresponse(response, 200, results);
    }, function(error) {
      sendJSONresponse(response, 404, error);
    });
  } else if(request.body.kind === "image") {
    imagesDao.imagesDelete(request)
    .then(function(results) {
      sendJSONresponse(response, 200, results);
    }, function(error) {
      sendJSONresponse(response, 404, error);
    });
  }
}

// Export controller methods
module.exports.elementsCreate = elementsCreate;
module.exports.elementsUpdate = elementsUpdate;
module.exports.elementsDelete = elementsDelete;
