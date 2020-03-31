// Include required modules
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var userDatabases = mongoose.model('userDatabase');

/*
 * Method that allows a User to look up what account is active in their session
 */
function userUsersReadOne(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId || !request.session.userUserId) {
      // Require a User to be logged in
      reject('User Database ID and User ID are both required!');
    } else {
      // Find the user whose session is currently active
      // Do not select sensitive fields
      userDatabases.findOne({'users._id': request.session.userUserId})
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
          let userUser = results.users.id(request.session.userUserId).toObject();
          delete userUser._id;
          delete userUser.password;
          // Register a blank password field and return results
          userUser.password = "";
          resolve(userUser);
        }
      });
    }
  });
  return promise;
}

/*
 * Method that allows Users to get all their Users
 */
 function userUsersReadAll(request) {
   var promise = new Promise(function(resolve, reject) {
     if(!request.body.viewsiteId) {
       // Required fields
       reject('User Database ID is required!');
     } else {
       // Find Viewsite to create User's User for
       userDatabases.findById(request.body.viewsiteId)
       .exec(function(error, userDatabaseData) {
         if(error) {
           // Handle unknown errors
           console.log(error.message);
           reject('Something went wrong!');
         } else if(userDatabaseData.userId != request.session.userId) {
           // Make sure User owns the Viewsite
           reject('You can only get Users signed up to your Viewsite!');
         } else if(!userDatabaseData) {
           // Handle non-existent query results
           reject('Viewsite not found!');
         } else {
           let cleanResults = [];
           // Clean up results and return the User's Users
           userDatabaseData.users.forEach(function(user) {
             let cleanUser = user.toObject();
             delete cleanUser._id;
             delete cleanUser.password;
             cleanResults.push(cleanUser);
           });
           resolve(cleanResults);
         }
       });
     }
   });
   return promise;
 }

/*
 * Method that allows User's Users to sign-up
 */
function userUsersCreate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId
      || !request.body.username
      || !request.body.password) {
      // Required fields
      reject('User Database ID, Username, and Password are all required!');
    } else {
      // Hash password to be stored
      bcrypt.hash(request.body.password, 10, function(error, hash) {
        if(error) {
          // Handle hasing errors
          console.log(error.message);
          reject('Something went wrong!');
        } else {
          // Find Viewsite to create User's User for
          userDatabases.findById(request.body.viewsiteId)
          .exec(function(error, userDatabaseData) {
            if(error) {
              // Handle unknown errors
              console.log(error.message);
              reject('Something went wrong!');
            } else if(!userDatabaseData) {
              // Handle non-existent query results
              reject('Viewsite not found!');
            } else {
              userDatabaseData.users.forEach(function(user) {
                if(user.username == request.body.username) {
                  reject('Username already exists!');
                }
              });
              // Add a new User's User to the Database
              let newUserIndex = userDatabaseData.users.push({
                'username': request.body.username,
                'password': hash
              });
              // Save the new user for later processing
              let newUser = userDatabaseData.users[newUserIndex-1];
              userDatabaseData.save(function(error, results) {
                if(error) {
                  // Handle unknown errors
                  reject('Something went wrong!');
                } else {
                  // Set the server session to the newly created User
                  request.session.userUserId = newUser._id;
                  request.session.userUserPermissionLevel = newUser.permissionLevel;
                  // Clean up results and return the new User Database
                  var cleanResults = newUser.toObject();
                  delete cleanResults._id;
                  delete cleanResults.password;
                  // Register a blank password field and return results
                  cleanResults.password = "";
                  resolve(cleanResults);
                }
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
 * Method that allows Users to modify their User's privileges
 */
 function userUsersUpdate(request) {
   var promise = new Promise(function(resolve, reject) {
     if(!request.body.viewsiteId
       || !request.body.username
       || isNaN(request.body.permissionLevel)) {
       // Required fields
       reject('User Database ID, Username, and Permission Level are all required!');
     } else {
       // Find Viewsite to create User's User for
       userDatabases.findById(request.body.viewsiteId)
       .exec(function(error, userDatabaseData) {
         if(error) {
           // Handle unknown errors
           console.log(error.message);
           reject('Something went wrong!');
         } else if(userDatabaseData.userId != request.session.userId) {
           // Make sure User owns the Viewsite
           reject('You can only modify users for Viewsites you own!');
         } else if(!userDatabaseData) {
           // Handle non-existent query results
           reject('Viewsite not found!');
         } else {
           // Find user's ID
           let userId = "";
           userDatabaseData.users.forEach(function(user) {
             if(user.username == request.body.username) {
               userId = user._id;
             }
           });
           // Update the User's User
           userDatabaseData
           .users.id(userId)
           .permissionLevel = request.body.permissionLevel;
           // Save the updated User's User
           userDatabaseData.save(function(error, results) {
             if(error) {
               // Handle unknown errors
               reject('Something went wrong!');
             } else {
               let cleanResults = [];
               // Clean up results and return the new User Database
               results.users.forEach(function(user) {
                 let cleanUser = user.toObject();
                 delete cleanUser._id;
                 delete cleanUser.password;
                 cleanResults.push(cleanUser);
               });
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
 function userUsersDelete(request) {
   var promise = new Promise(function(resolve, reject) {
     if(!request.body.viewsiteId
       || !request.body.username) {
       // Required fields
       reject('User Database ID and User ID are both required!');
     } else {
       // Find Viewsite to create User's User for
       userDatabases.findById(request.body.viewsiteId)
       .exec(function(error, userDatabaseData) {
         if(error) {
           // Handle unknown errors
           console.log(error.message);
           reject('Something went wrong!');
         } else if(userDatabaseData.userId != request.session.userId) {
           // Make sure User owns the Viewsite
           reject('You can only delete users for Viewsites you own!');
         } else if(!userDatabaseData) {
           // Handle non-existent query results
           reject('Viewsite not found!');
         } else {
           // Find user's ID
           let userId = "";
           userDatabaseData.users.forEach(function(user) {
             if(user.username == request.body.username) {
               userId = user._id;
             }
           });
           // Delete the User's User
           userDatabaseData.users.id(userId).remove();
           // Save the updated User's User
           userDatabaseData.save(function(error, results) {
             if(error) {
               // Handle unknown errors
               console.log(error);
               reject('Something went wrong!');
             } else {
               let cleanResults = [];
               // Clean up results and return the new User Database
               results.users.forEach(function(user) {
                 let cleanUser = user.toObject();
                 delete cleanUser._id;
                 delete cleanUser.password;
                 cleanResults.push(cleanUser);
               });
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
 * Method that allows Users to begin an active session
 */
function userUsersLogin(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId
      || !request.body.username
      || !request.body.password) {
      // Required fields
      reject('Viewsite ID, Username, and password are all required!');
    } else {
      // Find Viewsite to create User's User for
      userDatabases.findById(request.body.viewsiteId)
      .exec(function(error, userDatabaseData) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        }  else if(!userDatabaseData) {
          // Handle non-existent query results
          reject('Viewsite not found!');
        } else {
          // Find user's to log in
          let loginUser = {};
          userDatabaseData.users.forEach(function(user) {
            if(user.username == request.body.username) {
              loginUser = user;
            }
          });
          // Compare the hased User password with the supplied credentials
          bcrypt.compare(request.body.password, loginUser.password, function(error, match) {
            if(!match) {
              // Reject non-matched passwords
              reject('Wrong username or password!');
            } else {
              // Set an active session of the successful credentials
              request.session.userUserId = loginUser._id;
              request.session.userUserPermissionLevel = loginUser.permissionLevel;
              // Clean up results and return User information
              var cleanResults = loginUser.toObject();
              delete cleanResults._id;
              delete cleanResults.password;
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
function userUsersLogout(request) {
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
module.exports.userUsersReadOne = userUsersReadOne;
module.exports.userUsersReadAll = userUsersReadAll;
module.exports.userUsersCreate = userUsersCreate;
module.exports.userUsersUpdate = userUsersUpdate;
module.exports.userUsersDelete = userUsersDelete;
module.exports.userUsersLogin = userUsersLogin;
module.exports.userUsersLogout = userUsersLogout;
