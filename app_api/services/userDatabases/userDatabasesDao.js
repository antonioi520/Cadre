// Include required modules
var mongoose = require('mongoose');
var userDatabases = mongoose.model('userDatabase');

/*
 * Method that allows Viewsites to create a User Database
 * Invoked after creating a Viewsite
 *
 * NOTE: Not invoked directly via API
 */
function userDatabasesCreate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Ensure User is logged in
      reject('You must be logged in to create a User Database!');
    } else {
      // Create User Database
      userDatabases.create({
        '_id': request.body.viewsiteId,
        'userId': request.session.userId
      }, function(error, results) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else {
          // Remove User ID and version then return new User Database
          var cleanResults = results.toObject();
          delete cleanResults.userId;
          delete cleanResults.__v;
          resolve(cleanResults);
        }
      });
    }
  });
  return promise;
}

/*
 * Method that allows Viewsites to delete a User Database
 * Invoked after deleting a Viewsite
 *
 * NOTE: Not invoked directly via API
 */
function userDatabasesDelete(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId) {
      // Required fields
      reject('User Database ID is required!');
    } else if(!request.session.userId) {
      // Make sure User is logged in
      reject('You must be logged in to delete a viewsite!');
    } else {
      // Find User Database to delete
      userDatabases.findById(request.body.viewsiteId)
      .exec(function(error, userDatabaseData) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!userDatabaseData) {
          // Handle non-existent query results
          reject('User Database doesn\'t exist!');
        } else if(userDatabaseData.userId != request.session.userId) {
          // Make sure user owns the Database
          reject('You can only delete User Databases you own!');
        } else {
          // Remove the User Database
          userDatabases.findByIdAndRemove(request.body.viewsiteId)
          .exec(function(error, results) {
            if(error) {
              // Handle unknown errors when deleting
              console.log(error.message);
              reject('Something went wrong!');
            } else {
              // Remove User ID and version and return new User Database
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
 * Method that allows the deletion of every Database owned by a specific User
 * Invoked after deleting a User
 *
 * NOTE: Not invoked directly via API
 */
function userDatabasesDeleteAll(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.session.userId) {
      // Make sure User is logged in
      reject('User ID is required!');
    } else {
      // Remove all User Databases for said ID
      userDatabases.remove({"userId": request.session.userId})
      .exec(function(error, results) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else {
          // Resolve successful delete all operations
          resolve(true);
        }
      });
    }
  });
  return promise;
}

// Export all public methods
module.exports.userDatabasesCreate = userDatabasesCreate;
module.exports.userDatabasesDelete = userDatabasesDelete;
module.exports.userDatabasesDeleteAll = userDatabasesDeleteAll;
