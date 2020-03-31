// Include required modules
var mongoose = require('mongoose');
var viewsites = mongoose.model('viewsite');

/*
 * Method that allows Users to create Data View Elements
 *
 * NOTE: Form Elements share IDs with User Tables
 */
function dataViewsCreate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId || !request.body.viewpageId) {
      // Required IDs
      reject('Viewsite and Viewpage IDs are both required!');
    } else if(!request.body.formId) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to create a Data View!');
    } else {
      // Find Viewsite whose Viewpage's is creating a new Data View Element
      viewsites.findById(request.body.viewsiteId)
      .exec(function(error, viewsiteData) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(viewsiteData.userId != request.session.userId) {
          // Make sure Users own the Viewsite
          reject('You can only create Data Views for Viewsites you own!');
        } else if(!viewsiteData) {
          // Handle non-existent query results
          reject('Viewsite not found!');
        } else {
          // Push a new Data View Element onto the
          // Viewsite's Viewpage's Elements array
          viewsiteData.viewpages.id(request.body.viewpageId).elements.push({
            'kind': request.body.kind,
            'formId': request.body.formId
          });
          // Save the updated Viewsite
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
 * Method that allows Users to update Data View Elements
 *
 * NOTE: Form Elements share IDs with User Tables
 */
function dataViewsUpdate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId
      || !request.body.viewpageId
      || !request.body.elementId) {
      // Required IDs
      reject('Viewsite, Viewpage, and Element IDs are all required!');
    } else if(!request.body.formId) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to update a Data View!');
    } else {
      // Find Viewsite whose Viewpage is updating a Data View Element
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
          reject('You can only update Data Views you own!');
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
          .formId = request.body.formId;
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
 * Method that allows Users to delete Data View Elements
 */
function dataViewsDelete(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId
      || !request.body.viewpageId
      || !request.body.elementId) {
      // Required IDs
      reject('Viewsite, Viewpage, and Element IDs are all required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to delete a Data View!');
    } else {
      // Find Viewsite whose Viewpage is deleting a Data View Element
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
          reject('You can only delete Data Views you own!');
        } else if(!viewsiteData
          .viewpages.id(request.body.viewpageId)
          .elements.id(request.body.elementId)) {
          // Handle non-existent sub-documents
          reject('Element doesn\'t exist!');
        } else {
          // Remove the Data View Element
          viewsiteData
          .viewpages.id(request.body.viewpageId)
          .elements.id(request.body.elementId).remove();
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

// Export public methods
module.exports.dataViewsCreate = dataViewsCreate;
module.exports.dataViewsUpdate = dataViewsUpdate;
module.exports.dataViewsDelete = dataViewsDelete;
