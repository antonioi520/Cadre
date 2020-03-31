// Include required modules
var mongoose = require('mongoose');
var viewsites = mongoose.model('viewsite');

// Include DAOs required for cross-collection modification
var userDatabasesDao = require('../userDatabases/userDatabasesDao');

/*
 * Method that allows Users to read top-level information
 * for all owned Viewsites
 */
function viewsitesReadAll(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.session.userId) {
      // Be sure a user is logged in
      reject('User ID required!');
    } else {
      // Find all Viewsites of the logged in User
      // sans sensitive & redundant fields
      viewsites.find({'userId': request.session.userId})
      .select('-userId -__v -viewpages')
      .exec(function(error, results) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!results) {
          // Handle non-existent query results
          reject('No Viewsites found!');
        } else {
          // Otherwise, return all of a User's Viewsites
          resolve(results);
        }
      });
    }
  });
  return promise;
}

/*
 * Method that allows Users to read a Viewsite
 */
function viewsitesReadOne(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.params.viewsiteName) {
      // Required fields
      reject('Viewsite name is required!');
    } else {
      // Find a Viewsite of the specified Viewsite Name sans sensitive fields
      viewsites.findOne({'viewsiteName': request.params.viewsiteName})
      .exec(function(error, results) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!results) {
          // Handle non-existent query results
          reject('Viewsite not found!');
        } else {
          if(results.userId == request.session.userId) {
            // If the user owns the Viewsite then return all of it
            // after cleaning up sensitive data
            var cleanResults = results.toObject();
            delete cleanResults.userId;
            delete cleanResults.__v;
            resolve(cleanResults);
          } else if(request.session.userUserId
                    && request.session.userUserPermissionLevel) {
            // Otherwise, return only what is appropriate for the permission level
            let userUserViewsite = {
              '_id': results._id,
              'viewsiteName': results.viewsiteName,
              'viewsiteTheme': results.viewsiteTheme,
              'loginEnabled': results.loginEnabled,
              'viewpages': []
            };
            // Filter only authorized Viewpages
            for(viewpage of results.viewpages) {
              if(request.session.userUserPermissionLevel <= viewpage.permissionLevel) {
                userUserViewsite.viewpages.push(viewpage);
              }
            }
            // Resolve the modified Viewsite
            resolve(userUserViewsite);
          } else {
            // Otherwise, return only the public view of the Viewsite
            let publicViewsite = {
              '_id': results._id,
              'viewsiteName': results.viewsiteName,
              'viewsiteTheme': results.viewsiteTheme,
              'loginEnabled': results.loginEnabled,
              'viewpages': []
            };
            // Filter only public Viewpages
            for(viewpage of results.viewpages) {
              if(viewpage.permissionLevel == 3) {
                publicViewsite.viewpages.push(viewpage);
              }
            }
            // Resolve the modified Viewsite
            resolve(publicViewsite);
          }
        }
      });
    }
  });
  return promise;
}

/*
 * Method that allows Users to create Viewsites
 */
function viewsitesCreate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteName) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Be sure a User is logged in
      reject('You must be logged in to create a Viewsite!');
    } else {
      // Create the Viewsite using the logged in User's ID
      viewsites.create({
        'userId': request.session.userId,
        'viewsiteName': request.body.viewsiteName,
        'viewsiteTheme': request.body.viewsiteTheme,
        'loginEnabled': request.body.loginEnabled
      }, function(error, results) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          if(error.message === 'There was a duplicate key error') {
            // Handle existing Viewsite names
            reject('Viewsite already exists!');
          } else {
            // Otherwise, return generic error message
            reject('Something went wrong!');
          }
        } else {
          // Set the Viewsite ID in the request to use in
          // creating a User Database of the same ID
          request.body.viewsiteId = results._id;
          // Create a User Database associated with the new Viewsite
          userDatabasesDao.userDatabasesCreate(request)
          .then(function() {
            // Afterwards, get all Viewsites a User owns
            viewsitesReadAll(request)
            .then(function(results) {
              // Resolve with all of the User's Viewsites
              resolve(results);
            }, function(error) {
              // Handle unknown errors in reading all of a User's Viewsites
              console.log(error.message);
              reject('Something went wrong!');
            });
          }, function(error) {
            // Handle unknown errors in creating an associated User Database
            console.log(error.message);
            reject('Something went wrong!');
          });
        }
      });
    }
  });
  return promise;
}

/*
 * Method that allows Users to update Viewsites
 */
function viewsitesUpdate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId) {
      // Required IDs
      reject('Viewsite ID is required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to update a viewsite!');
    } else {
      // Find the Viewsite to update
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
          // Make sure User owns Viewsite to update
          reject('You can only update Viewsites you own!');
        } else {
          // Set new fields
          viewsiteData.viewsiteName = request.body.viewsiteName;
          viewsiteData.viewsiteTheme = request.body.viewsiteTheme;
          viewsiteData.loginEnabled = request.body.loginEnabled;
          // Save updated Viewsite
          viewsiteData.save(function(error, results) {
            if(error) {
              // Handle unknown errors
              console.log(error.message);
              if(error.message === 'There was a duplicate key error') {
                // Handle existing Viewsite name
                reject('Viewsite already exists!');
              } else {
                // Otherwise, set generic error message
                reject('Something went wrong!');
              }
            } else {
              // If successful, read all of a User's Viewsites
              viewsitesReadAll(request)
              .then(function(results) {
                // Resolve with the User's Viewsites
                resolve(results);
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
 * Method that allows Users to delete Viewsites
 */
function viewsitesDelete(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId) {
      // Required IDs
      reject('Viewsite ID is required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to delete a viewsite!');
    } else {
      // Find Viewsite to delete
      viewsites.findById(request.body.viewsiteId)
      .exec(function(error, viewsiteData) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!viewsiteData) {
          // Handle non-existent query results
          reject('Viewsite doesn\'t exist!');
        } else if(viewsiteData.userId != request.session.userId) {
          // Make sure User owns Viewsite to delete
          reject('You can only delete Viewsites you own!');
        } else {
          // Find the Viewsite and remove it
          viewsites.findByIdAndRemove(request.body.viewsiteId)
          .exec(function(error, results) {
            if(error) {
              // Handle unknown errors
              console.log(error.message);
              reject('Something went wrong!');
            } else {
              // If successful, delete associated User Database
              userDatabasesDao.userDatabasesDelete(request)
              .then(function() {
                // If all goes well, return to the User all owned Viewsites
                viewsitesReadAll(request)
                .then(function(results) {
                  // Resolve with high-level data on Viewsites
                  resolve(results);
                }, function(error) {
                  // Handle unknown errors while reading all Viewsites
                  console.log(error.message);
                  reject('Something went wrong!');
                });
              }, function(error) {
                // Handle unknown errors while deleting User Database
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
 * Method that allows the deletion of every Viewsite owned by a specific User
 * Invoked after deleting a User
 *
 * NOTE: Not directly invoked via the API
 */
function viewsitesDeleteAll(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.session.userId) {
      // Make sure a User is logged in
      reject('User ID is required!');
    } else {
      // Remove all Viewsites of a specific User
      viewsites.remove({"userId": request.session.userId})
      .exec(function(error, results) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else {
          // If all goes well, resolve true
          resolve(true);
        }
      });
    }
  });
  return promise;
}

// Export public methods
module.exports.viewsitesReadAll = viewsitesReadAll;
module.exports.viewsitesReadOne = viewsitesReadOne;
module.exports.viewsitesCreate = viewsitesCreate;
module.exports.viewsitesUpdate = viewsitesUpdate;
module.exports.viewsitesDelete = viewsitesDelete;
module.exports.viewsitesDeleteAll = viewsitesDeleteAll;
