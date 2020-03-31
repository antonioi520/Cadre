// Include required modules
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var users = mongoose.model('user');

// Include DAOs required for cross-collection modification
var viewsitesDao = require('../viewsites/viewsitesDao');
var userDatabasesDao = require('../userDatabases/userDatabasesDao');

/*
 * Method that allows a User to look up what account is active in their session
 */
function usersReadOne(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.session.userId) {
      // Require a User to be logged in
      reject('User ID is required!');
    } else {
      // Find the user whose session is currently active
      // Do not select sensitive fields
      users.findOne({'_id': request.session.userId})
      .select('-_id -password -__v')
      .exec(function(error, results) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!results) {
          // Handle non-existent query results
          reject('User not found!');
        } else {
          // Register a blank password field and return results
          results.password = "";
          resolve(results);
        }
      });
    }
  });
  return promise;
}

/*
 * Method that allows Users sign-up
 */
function usersCreate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.username || !request.body.password) {
      // Required fields
      reject('Username and Password are both required!');
    } else {
      // Hash password to be stored
      bcrypt.hash(request.body.password, 10, function(error, hash) {
        if(error) {
          // Handle hasing errors
          console.log(error.message);
          reject('Something went wrong!');
        } else {
          // Create user with hased password
          users.create({
            'username': request.body.username,
            'password': hash
          }, function(error, results) {
            if(error) {
              // Handle unknown errors
              console.log(error.message);
              if(error.message === 'There was a duplicate key error') {
                // Handle existing User names
                reject('Username already exists!');
              } else {
                // Otherwise, return generic error
                reject('Something went wrong!');
              }
            } else {
              // Set the server session to the newly created User
              request.session.userId = results._id;
              // Clean up the results and return User information
              var cleanResults = results.toObject();
              delete cleanResults._id;
              delete cleanResults.password;
              delete cleanResults.__v;
              cleanResults.password = "";
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
 * Method that allows Users to modify their account details
 */
function usersUpdate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.session.userId) {
      // Required IDs
      reject('User ID is required!');
    } else {
      // Find user of active session
      users.findById(request.session.userId)
      .exec(function(error, userData) {
        if (error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!userData) {
          // Handle non-existent query results
          reject('User not found!');
        } else {
          // Set new User information
          userData.username = request.body.username;
          // If a new password was requested, set it as well
          if(request.body.password) {
            let hash = bcrypt.hashSync(request.body.password, 10);
            userData.password = hash;
          }
          // Save new User information
          userData.save(function(error, results) {
            if(error) {
              // Handle unknown errors
              console.log(error.message);
              if(error.message === 'There was a duplicate key error') {
                // Handle existing User names
                reject('Username already exists!');
              } else {
                // Otherwise, return generic error
                reject('Something went wrong!');
              }
            } else {
              // Clean up results and return updated User data
              var cleanResults = results.toObject();
              delete cleanResults._id;
              delete cleanResults.password;
              delete cleanResults.__v;
              cleanResults.password = "";
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
 * Method that allows Users to delete their account
 * This also deletes a User's Viewsites & Databases
 */
function usersDelete(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.session.userId) {
      // Required IDs
      reject('User ID is required!');
    } else {
      // Find and remove User of active session
      users.findByIdAndRemove(request.session.userId)
      .exec(function(error, results) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!results) {
          // Handle non-existent query results
          reject('User not found!');
        } else {
          // After deleting a User, delete the User's Viewsites
          viewsitesDao.viewsitesDeleteAll(request)
          .then(function(results) {
            // After deleting Viewsites, delete their associated User Databases
            userDatabasesDao.userDatabasesDeleteAll(request)
            .then(function(results) {
              // Resolve with true
              resolve(true);
            }, function(error) {
              // Handle unknown errors deleting User Databases
              console.log(error.message);
              reject('Something went wrong!');
            });
          }, function(error) {
            // Handle unknown errors deleting Viewsites
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
 * Method that allows Users to begin an active session
 */
function usersLogIn(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.username || !request.body.password) {
      // Required fields
      reject('Username and password are both required!');
    } else {
      // Find the User of the requested Username
      users.findOne({'username': request.body.username})
      .exec(function(error, results) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!results) {
          // Handle non-existent query results
          reject('Username not found!');
        } else {
          // Compare the hased User password with the supplied credentials
          bcrypt.compare(request.body.password, results.password, function(error, match) {
            if(!match) {
              // Reject non-matched passwords
              reject('Wrong username or password!');
            } else {
              // Set an active session of the successful credentials
              request.session.userId = results._id;
              // Clean up results and return User information
              var cleanResults = results.toObject();
              delete cleanResults._id;
              delete cleanResults.password;
              delete cleanResults.__v;
              cleanResults.password = "";
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
 * Method that destroys a User's active session
 */
function usersLogout(request) {
  var promise = new Promise(function(resolve, reject) {
    if(request.session) {
      // Be sure an active session exists and if it does, destroy it
      request.session.destroy(function(error) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else {
          // Resolve a blank User
          resolve({
            'username': "",
            'password': ""
          });
        }
      });
    }
  });
  return promise;
}

// Export public methods
module.exports.usersReadOne = usersReadOne;
module.exports.usersCreate = usersCreate;
module.exports.usersUpdate = usersUpdate;
module.exports.usersDelete = usersDelete;
module.exports.usersLogIn = usersLogIn;
module.exports.usersLogout = usersLogout;
