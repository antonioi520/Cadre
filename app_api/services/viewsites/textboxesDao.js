// Include required modules
var mongoose = require('mongoose');
var viewsites = mongoose.model('viewsite');

/*
 * Method that allows Users to create Textbox Form Inputs
 */
function textboxesCreate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId
      || !request.body.viewpageId
      || !request.body.elementId) {
      // Required IDs
      reject('Viewsite, Viewpage, and Element IDs are all required!');
    } else if(!request.body.textboxLabel) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to create a Textbox!');
    } else {
      // Find Viewsite in which a new Textbox Form Input is to be created
      viewsites.findById(request.body.viewsiteId)
      .exec(function(error, viewsiteData) {
        if(viewsiteData.userId != request.session.userId) {
          // Make sure User owns Viewsite
          reject('You can only create Textboxes for Viewsites you own!');
        } else if(!viewsiteData) {
          // Handle non-existent query results
          reject('Viewsite not found!');
        } else {
          // Push a new Textbox Form Input onto the
          // Viewsite's Viewpage's Element's Form Input array
          viewsiteData
          .viewpages.id(request.body.viewpageId)
          .elements.id(request.body.elementId)
          .formInputs.push({
            'kind': request.body.kind,
            'textboxLabel': request.body.textboxLabel
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
 * Method that allows Users to update Textbox Form Inputs
 */
function textboxesUpdate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId
      || !request.body.viewpageId
      || !request.body.elementId
      || !request.body.formInputId) {
      // Required IDs
      reject('Viewsite, Viewpage, Element, and Form Input IDs are all required!');
    } else if(!request.body.textboxLabel) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to update a Form!');
    } else {
      // Find Viewsite whose Viewpage's Element's
      // Textbox Form Input needs to be updated
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
          reject('You can only update Textboxes you own!');
        } else if(!viewsiteData
          .viewpages.id(request.body.viewpageId)
          .elements.id(request.body.elementId)
          .formInputs.id(request.body.formInputId)) {
          // Handle non-existent sub-documents
          reject('Form Input doesn\'t exist!');
        } else {
          // Set the updated fields
          viewsiteData
          .viewpages.id(request.body.viewpageId)
          .elements.id(request.body.elementId)
          .formInputs.id(request.body.formInputId)
          .textboxLabel = request.body.textboxLabel;
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
 * Method that allows Users to delete Textbox Form Inputs
 */
function textboxesDelete(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId
      || !request.body.viewpageId
      || !request.body.elementId
      || !request.body.formInputId) {
      // Required IDs
      reject('Viewsite, Viewpage, Element, and Form Input IDs are all required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to delete a Form Input!');
    } else {
      // Find Viewsite whose Viewpage's Element's
      // Textbox Form input is to be deleted
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
          reject('You can only delete Form Inputs you own!');
        } else if(!viewsiteData
          .viewpages.id(request.body.viewpageId)
          .elements.id(request.body.elementId)
          .formInputs.id(request.body.formInputId)) {
          // Handle non-existent sub-documents
          reject('Form Input doesn\'t exist!');
        } else {
          // Remove Textbox Form Input
          viewsiteData
          .viewpages.id(request.body.viewpageId)
          .elements.id(request.body.elementId)
          .formInputs.id(request.body.formInputId).remove();
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

// Export public methods
module.exports.textboxesCreate = textboxesCreate;
module.exports.textboxesUpdate = textboxesUpdate;
module.exports.textboxesDelete = textboxesDelete;
