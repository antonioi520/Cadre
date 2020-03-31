// Include required modules
var mongoose = require('mongoose');
var userDatabases = mongoose.model('userDatabase');

/*
 * Method that allows User Tables to be read individually
 */
function userTablesReadOne(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId || !request.body.elementId) {
      reject('User Database and Table IDs are both required!');
    } else {
      userDatabases.findOne({'_id': request.body.viewsiteId})
      .exec(function(error, userDatabaseData) {
        if(error) {
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!userDatabaseData) {
          reject('User Database not found!');
        } else if(!userDatabaseData.tables.id(request.body.elementId)) {
          reject('User Table doesn\'t exist!');
        } else {
          resolve(userDatabaseData.tables.id(request.body.elementId));
        }
      });
    }
  });
  return promise;
}

/*
 * Method that allows an arrau of User Tables to be read
 */
function userTablesReadAll(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId || !request.body.elements) {
      reject('User Database ID and array of Tables are required!');
    } else {
      userDatabases.findOne({'_id': request.body.viewsiteId})
      .exec(function(error, userDatabaseData) {
        if(error) {
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!userDatabaseData) {
          reject('User Database not found!');
        } else {
          let matchingTables = [];
          for(let element of request.body.elements) {
            if(userDatabaseData.tables.id(element.formId)) {
              matchingTables.push(userDatabaseData.tables.id(element.formId));
            }
          }
          resolve(matchingTables);
        }
      });
    }
  });
  return promise;
}

/*
 * Method that allows Form Elements to create a User Table
 * Invoked after creating a Form Element
 *
 * NOTE: This method is not directly invoked via the API
 */
function userTablesCreate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId) {
      // Required IDs
      reject('User Database ID is required!');
    } else if(!request.body.elementId) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Be sure a User is logged in
      reject('You must be logged in to create a User Table!');
    } else {
      // Find Database in which to create a new table
      userDatabases.findById(request.body.viewsiteId)
      .exec(function(error, userDatabaseData) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(userDatabaseData.userId != request.session.userId) {
          // Make sure logged in User owns Database
          reject('You can only create User Tables for User Databases you own!');
        } else if(!userDatabaseData) {
          // Handle non-existent query results
          reject('User Database not found!');
        } else {
          // Add a new User Table to the Database
          userDatabaseData.tables.push({
            '_id': request.body.elementId
          });
          userDatabaseData.save(function(error, results) {
            if(error) {
              // Handle unknown errors
              console.log(error.message);
              reject('Something went wrong!');
            } else {
              // Clean up results and return the new User Database
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
 * Method that allows Form Elements to delete a User Table
 * Invoked after deleting a Form Element
 *
 * NOTE: This method is not directly invoked via the API
 */
function userTablesDelete(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId || !request.body.elementId) {
      // Required IDs
      reject('User Database and Table IDs are both required!');
    } else if(!request.session.userId) {
      // Make sure a User is logged in
      reject('You must be logged in to delete a User Table!');
    } else {
      // Find the User Database which has a pending Table deletion
      userDatabases.findById(request.body.viewsiteId)
      .exec(function(error, userDatabaseData) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!userDatabaseData) {
          // Handle non-existent query results
          reject('User Database not found!');
        } else if(userDatabaseData.userId != request.session.userId) {
          // Make sure User owns the Database
          reject('You can only delete User Tables you own!');
        } else if(!userDatabaseData.tables.id(request.body.elementId)) {
          // Handle non-existent sub-documents
          reject('User Table doesn\'t exist!');
        } else {
          // Remove the User Table to be deleted
          userDatabaseData.tables.id(request.body.elementId).remove();
          // Save the new User Database
          userDatabaseData.save(function(error, results) {
            if(error) {
              // Handle unknown errors
              console.log(error.message);
              reject('Something went wrong!');
            } else {
              // Clean up results and send back the new User Database
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

// Export all public methods
module.exports.userTablesReadOne = userTablesReadOne;
module.exports.userTablesReadAll = userTablesReadAll;
module.exports.userTablesCreate = userTablesCreate;
module.exports.userTablesDelete = userTablesDelete;
