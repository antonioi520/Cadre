// Add required modules already built into Nodejs
var fs = require("fs");
var path = require('path');

// Include required modules
var mongoose = require('mongoose');
var viewsites = mongoose.model('viewsite');

/*
 * Method that allows Users to create Image Elements
 */
function imagesCreate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId || !request.body.viewpageId) {
      // Required IDs
      reject('Viewsite and Viewpage IDs are both required!');
    } else if(!request.files) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to create Images!');
    } else {
      // Find Viewsite to add Images Element to
      viewsites.findById(request.body.viewsiteId)
      .exec(function(error, viewsiteData) {
        if(viewsiteData.userId != request.session.userId) {
          // Make sure User owns Viewsite
          reject('You can only create Images for Viewsites you own!');
        } else if(!viewsiteData) {
          // Handle non-existent query results
          reject('Viewsite not found!');
        } else {
          let newElement = viewsiteData.viewpages.id(request.body.viewpageId).elements.push({
            'kind': request.body.kind,
            'imageLocation': 'none'
          });
          request.body.elementId = viewsiteData.viewpages.id(request.body.viewpageId).elements[newElement-1]._id;
          console.log(request.elementId);
          // Save image to proper location
          saveNewImage(request).then(function(results) {
            // Set the location of the image as the location of the new image
            viewsiteData.viewpages.id(request.body.viewpageId).elements[newElement-1].imageLocation = results;
            // Save updated Viewsite with new Images Element data
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
          }, function(error) {
            // Find appropriate error message
            if(error == "ERROR: mimetype") {
              reject('Image must be png, gif, or jpeg');
            } else {
              reject('Something went wrong!');
            }
          });


        }
      });
    }
  });
  return promise;
}

/*
 * Method that allows Users to update Images Elements
 */
function imagesUpdate(request) {
  console.log(request.files);
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId
      || !request.body.viewpageId
      || !request.body.elementId) {
      // Required IDs
      reject('Viewsite, Viewpage, and Element IDs are all required!');
    } else if(!request.files) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Be sure a User is logged in
      reject('You must be logged in to update Images!');
    } else {
      // Find Viewsite that has a Images Element to update
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
          reject('You can only update Images you own!');
        } else if(!viewsiteData
          .viewpages.id(request.body.viewpageId)
          .elements.id(request.body.elementId)) {
          // Handle non-existent sub-documents
          reject('Element doesn\'t exist!');
        } else {
          // Save image to proper location
          saveNewImage(request).then(function(results) {
            let newImageLocation = results;
            // Set updated fields
            viewsiteData
            .viewpages.id(request.body.viewpageId)
            .elements.id(request.body.elementId)
            .imageLocation = newImageLocation;
            // Save updated Viewsite with new Images Element data
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
          }, function(error) {
            // Find appropriate error message
            if(error == "ERROR: mimetype") {
              reject('Image must be png, gif, or jpeg');
            } else {
              reject('Something went wrong!');
            }
          });
        }
      });
    }
  });
  return promise;
}

/*
 * Method that allows Users to delete Images Elements
 */
function imagesDelete(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId
      || !request.body.viewpageId
      || !request.body.elementId) {
      // Required IDs
      reject('Viewsite, Viewpage, and Element IDs are all required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to delete Images!');
    } else {
      // Find Viewsite with Images Element to remove
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
          reject('You can only delete Images you own!');
        } else if(!viewsiteData
          .viewpages.id(request.body.viewpageId)
          .elements.id(request.body.elementId)) {
          // Handle non-existent sub-documents
          reject('Element doesn\'t exist!');
        } else {
          // Otherwise, define existing image location
          const oldImageLocation = viewsiteData
          .viewpages.id(request.body.viewpageId)
          .elements.id(request.body.elementId)
          .imageLocation;
          // If an old image exists
          if(oldImageLocation) {
            // Delete old image
            deleteOldImage(oldImageLocation).then(function(results) {
              // Remove the Images element from the Viewsite's Viewpage
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
            }, function(error) {
              reject('Something went wrong!');
            });
          }
        }
      });
    }
  });
  return promise;
}

/*
 * Helper method used to save new images
 */
function saveNewImage(request) {
  var promise = new Promise(function(resolve, reject) {
    // Retrieve the uploaded file
    let fileUpload = request.files.fileUpload;
    // Only continue if the file has an appropriate mimetype
    if(fileUpload &&
      (fileUpload.mimetype == 'image/gif'
      || fileUpload.mimetype == 'image/png'
      || fileUpload.mimetype == 'image/jpeg')) {
      // Get the file directories
      let rootDir = path.dirname(require.main.filename) + "/public";
      let imagesDir = rootDir + "/images";
      let viewsiteDir = imagesDir + "/" + request.body.viewsiteId;
      let viewpageDir = viewsiteDir + "/" + request.body.viewpageId;

      // Define the file extension
      let fileExtension = fileUpload.mimetype
          .slice(fileUpload.mimetype.indexOf("/") + 1);
      // Define the location of the file to be saved
      let fileLocation = viewpageDir
      + "/"
      + request.body.elementId
      + "."
      + fileExtension;
      //Check if the images directory exists
      fs.access(imagesDir, fs.constants.F_OK, (error) => {
        if(error) {
          // Make the images directory if it doesn't exist
          fs.mkdirSync(imagesDir);
        }
        // Check if the Viewsite directory exists
        fs.access(viewsiteDir, fs.constants.F_OK, (error) => {
          if(error) {
            // Make the Viewsite directory if it doesn't exist
            fs.mkdirSync(viewsiteDir);
          }
          // Check if the Viewpage directory exists
          fs.access(viewpageDir, fs.constants.F_OK, (error) => {
            if(error) {
              // Make the Viewpage directory if it doesn't exist
              fs.mkdirSync(viewpageDir);
            }
            // Finally, move the file to the specified location of the server
            fileUpload.mv(fileLocation, function(error) {
              if(error) {
                console.log(error.message);
                reject('ERROR: upload');
              }
              // If successful, return the file location sans root directory
              resolve(fileLocation.slice(rootDir.length));
            });
          });
        });
      });
    } else {
      reject('ERROR: mimetype');
    }
  });
  return promise;
}

/*
 * Helper method used to delete old images
 */
function deleteOldImage(imageLocation) {
  var promise = new Promise(function(resolve, reject) {
    let rootDir = path.dirname(require.main.filename) + "/public";
    let fullImagePath = rootDir + imageLocation;
    fs.unlink(fullImagePath, (error) => {
      if(error) {
        reject('ERROR: unlink');
      } else {
        resolve('Successfully deleted image!');
      }
    });
  });
  return promise;
}

// Export public methods
module.exports.imagesCreate = imagesCreate;
module.exports.imagesUpdate = imagesUpdate;
module.exports.imagesDelete = imagesDelete;
