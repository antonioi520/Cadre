// Include required modules
var mongoose = require('mongoose');
var viewsites = mongoose.model('viewsite');

/*
 * Method that allows Users to create Text Elements
 */
function textCreate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId || !request.body.viewpageId) {
      // Required IDs
      reject('Viewsite and Viewpage IDs are both required!');
    } else if(!request.body.textValue) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to create Text!');
    } else {
      // Find Viewsite to add Text Element to
      viewsites.findById(request.body.viewsiteId)
      .exec(function(error, viewsiteData) {
        if(viewsiteData.userId != request.session.userId) {
          // Make sure User owns Viewsite
          reject('You can only create Text for Viewsites you own!');
        } else if(!viewsiteData) {
          // Handle non-existent query results
          reject('Viewsite not found!');
        } else {
          // Push a new Text Element onto the Viewsite's Viewpage
          viewsiteData.viewpages.id(request.body.viewpageId).elements.push({
            'kind': request.body.kind,
            'textValue': request.body.textValue
          });
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
 * Method that allows Users to update Text Elements
 */
function textUpdate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId
      || !request.body.viewpageId
      || !request.body.elementId) {
      // Required IDs
      reject('Viewsite, Viewpage, and Element IDs are all required!');
    } else if(!request.body.textValue) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Be sure a User is logged in
      reject('You must be logged in to update Text!');
    } else {
      // Find Viewsite that has a Text Element to update
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
          reject('You can only update Text you own!');
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
          .textValue = request.body.textValue;
          // Save updated Viewsite with new Text Element data
          viewsiteData.save(function(error, results) {
            if(error) {
              // Handle unknown errors
              console.log(error.message);
              reject('Something went wrong!');
            } else {
              // Clean up the results and return up-to-date Viewsite
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
 * Method that allows Users to delete Text Elements
 */
function textDelete(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId
      || !request.body.viewpageId
      || !request.body.elementId) {
      // Required IDs
      reject('Viewsite, Viewpage, and Element IDs are all required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to delete Text!');
    } else {
      // Find Viewsite with Text Element to remove
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
          reject('You can only delete Text you own!');
        } else if(!viewsiteData
          .viewpages.id(request.body.viewpageId)
          .elements.id(request.body.elementId)) {
          // Handle non-existent sub-documents
          reject('Element doesn\'t exist!');
        } else {
          // Otherwise, remove the Text element from the Viewsite's Viewpage
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
module.exports.textCreate = textCreate;
module.exports.textUpdate = textUpdate;
module.exports.textDelete = textDelete;
