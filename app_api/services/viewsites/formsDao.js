// Include required modules
var mongoose = require('mongoose');
var viewsites = mongoose.model('viewsite');

// Include DAOs required for cross-collection modification
var userTablesDao = require('../userDatabases/userTablesDao');

/*
 * Method that allows Users to create Form Elements
 */
function formsCreate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId || !request.body.viewpageId) {
      // Required IDs
      reject('Viewsite and Viewpage IDs are both required!');
    } else if(!request.body.formTitle) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to create a Form!');
    } else {
      // Find Viewsite whose Viewpage a Form Element is being created for
      viewsites.findById(request.body.viewsiteId)
      .exec(function(error, viewsiteData) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(viewsiteData.userId != request.session.userId) {
          // Make sure User owns Viewsite
          reject('You can only create Forms for Viewsites you own!');
        } else if(!viewsiteData) {
          // Handle non-existent query results
          reject('Viewsite not found!');
        } else {
          // Push a new Form Element onto the
          // Viewsite's Viewpage's Element array
          viewsiteData.viewpages.id(request.body.viewpageId).elements.push({
            'kind': request.body.kind,
            'formTitle': request.body.formTitle
          });
          // Save the new Viewsite data
          viewsiteData.save(function(error, results) {
            if(error) {
              // Handle unknown errors
              console.log(error.message);
              reject('Something went wrong!');
            } else {
              // Get the number of elements a Viewpage has
              let elementsLength = results
              .viewpages.id(request.body.viewpageId)
              .elements.length;
              // Get the ID of the Form Element just created
              request.body.elementId = results
              .viewpages.id(request.body.viewpageId)
              .elements[elementsLength - 1]._id;
              // Create a User Table with the same ID as the
              // Form Element just created
              userTablesDao.userTablesCreate(request)
              .then(function() {
                // Clean up results and return up-to-date Viewsite
                var cleanResults = results.toObject();
                delete cleanResults.userId;
                delete cleanResults.__v;
                resolve(cleanResults);
              }, function(error) {
                // Handle unknown errors
                console.log(error.message);
                reject('Something went wrong!');
              });
            }
          });
        }
      });
    }
  });
  return promise;
}

/*
 * Method that allows Users to update Form Elements
 */
function formsUpdate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId
      || !request.body.viewpageId
      || !request.body.elementId) {
      // Required IDs
      reject('Viewsite, Viewpage, and Element IDs are all required!');
    } else if(!request.body.formTitle) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to update a Form!');
    } else {
      // Find Viewsite whose Viewpage's Element is to be updated
      viewsites.findById(request.body.viewsiteId)
      .exec(function(error, viewsiteData) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!viewsiteData) {
          // Handle non-existent query results
          reject('Viewsite not found!');
        } else if(viewsiteData.userId != request.session.userId) {
          // Make sure User owns Viewsite
          reject('You can only update Forms you own!');
        } else if(!viewsiteData
          .viewpages.id(request.body.viewpageId)
          .elements.id(request.body.elementId)) {
          // Handle non-existent sub-documents
          reject('Element doesn\'t exist!');
        } else {
          // Set updated fields
          viewsiteData
          .viewpages.id(request.body.viewpageId)
          .elements.id(request.body.elementId)
          .formTitle = request.body.formTitle;
          // Save updated Viewsite
          viewsiteData.save(function(error, results) {
            if(error) {
              // Handle unknown errors
              console.log(error.message);
              reject('Something went wrong!');
            } else {
              // Clean up results and return up-to-date Viewsite
              var cleanResults = results.toObject();
              delete cleanResults.userId;
              delete cleanResults.__v;
              resolve(cleanResults);
            }
          });
        }
      });
    }
  });
  return promise;
}

/*
 * Method that allows Users to delete Form Elements
 */
function formsDelete(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId
      || !request.body.viewpageId
      || !request.body.elementId) {
      // Required IDs
      reject('Viewsite, Viewpage, and Element IDs are all required!');
    } else if(!request.session.userId) {
      // Be sure a User is logged in
      reject('You must be logged in to delete a Form!');
    } else {
      // Find Viewsite whose Viewpages Form Element is to be deleted
      viewsites.findById(request.body.viewsiteId)
      .exec(function(error, viewsiteData) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!viewsiteData) {
          // Handle non-existent query results
          reject('Viewsite not found!');
        } else if(viewsiteData.userId != request.session.userId) {
          // Make sure User owns Viewsite
          reject('You can only delete Forms you own!');
        } else if(!viewsiteData
          .viewpages.id(request.body.viewpageId)
          .elements.id(request.body.elementId)) {
          // Handle non-existent sub-documents
          reject('Element doesn\'t exist!');
        } else {
          // Remove the Form Element
          viewsiteData
          .viewpages.id(request.body.viewpageId)
          .elements.id(request.body.elementId).remove();
          // Save the updated Viewsite
          viewsiteData.save(function(error, results) {
            if(error) {
              // Handle unknown errors
              console.log(error.message);
              reject('Something went wrong!');
            } else {
              // If all went well, delete User Table associated
              // with the Form Element
              userTablesDao.userTablesDelete(request)
              .then(function() {
                // Clean up results and return up-to-date Viewsite
                var cleanResults = results.toObject();
                delete cleanResults.userId;
                delete cleanResults.__v;
                resolve(cleanResults);
              }, function(error) {
                // Handle unknown errors
                console.log(error.message);
                reject('Something went wrong!');
              });
            }
          });
        }
      });
    }
  });
  return promise;
}

// Export public methods
module.exports.formsCreate = formsCreate;
module.exports.formsUpdate = formsUpdate;
module.exports.formsDelete = formsDelete;
