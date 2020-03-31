// Include required modules
var mongoose = require('mongoose');
var viewsites = mongoose.model('viewsite');

/*
 * Method that allows Users to create Viewpages
 */
function viewpagesCreate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId) {
      // Required IDs
      reject('Viewsite ID is required!');
    } else if(!request.body.viewpageName) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to create a Viewpage!');
    } else {
      // Find Viewsite to create Viewpage for
      viewsites.findById(request.body.viewsiteId)
      .exec(function(error, viewsiteData) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(viewsiteData.userId != request.session.userId) {
          // Make sure User owns the Viewsite
          reject('You can only create Viewpages for Viewsites you own!');
        } else if(!viewsiteData) {
          // Handle non-existent query results
          reject('Viewsite not found!');
        } else {
          // Push the new Viewpage onto the Viewsite's Viewpages array
          viewsiteData.viewpages.push({
            'viewpageName': request.body.viewpageName,
            'permissionLevel': request.body.permissionLevel
          });
          // Save the new Viewsite
          viewsiteData.save(function(error, results) {
            if(error) {
              // Handle unknown errors
              console.log(error.message);
              reject('Something went wrong!');
            } else {
              // Clean up results and return new Viewsite
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
 * Method that allows Users to update Viewpages
 */
function viewpagesUpdate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId || !request.body.viewpageId) {
      // Required IDs
      reject('Viewsite and Viewpage IDs are both required!');
    } else if(!request.body.viewpageName) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to update a Viewpage!');
    } else {
      // Find Viewsite with Viewpage to update
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
          reject('You can only update Viewpages you own!');
        } else if(!viewsiteData.viewpages.id(request.body.viewpageId)) {
          // Handle non-existent sub-documents
          reject('Viewpage doesn\'t exist!');
        } else {
          // Set the updated fields
          viewsiteData
          .viewpages.id(request.body.viewpageId)
          .viewpageName = request.body.viewpageName;
          viewsiteData
          .viewpages.id(request.body.viewpageId)
          .permissionLevel = request.body.permissionLevel;
          // Save the new Viewsite
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
 * Method that allows Users to delete Viewpages
 */
function viewpagesDelete(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId || !request.body.viewpageId) {
      // Required IDs
      reject('Viewsite and Viewpage IDs are both required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to delete a Viewpage!');
    } else {
      // Find Viewsite to modify
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
          reject('You can only delete Viewpages you own!');
        } else if(!viewsiteData.viewpages.id(request.body.viewpageId)) {
          // Handle non-existent sub-documents
          reject('Viewpage doesn\'t exist!');
        } else {
          // Remove Viewpage sub-document from Viewsite
          viewsiteData.viewpages.id(request.body.viewpageId).remove();
          // Save new Viewsite
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

// Export public methods
module.exports.viewpagesCreate = viewpagesCreate;
module.exports.viewpagesUpdate = viewpagesUpdate;
module.exports.viewpagesDelete = viewpagesDelete;
