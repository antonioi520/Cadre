// Include required modules
var mongoose = require('mongoose');
var userDatabases = mongoose.model('userDatabase');

/*
 * Method that allows Users to add a new Record
 */
function userRecordsCreate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId || !request.body.elementId) {
      // Required IDs
      reject('User Database and Table IDs are both required!');
    } else if(!request.body.record) {
      // Required fields
      reject('All fields required!');
    } else {
      // Find User Database to add Record to
      userDatabases.findById({'_id': request.body.viewsiteId})
      .exec(function(error, userDatabaseData) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!userDatabaseData) {
          // Handle non-existent query results
          reject('User Database not found!');
        } else if(!userDatabaseData.tables.id(request.body.elementId)) {
          // Handle non-existent sub-query results
          reject('User Table doesn\'t exist!');
        } else  {
          // Create a new blank Record
          let newRecord = userDatabaseData
          .tables.id(request.body.elementId)
          .records.create();
          // Fill out the new Record
          for(formFieldId in request.body.record) {
            newRecord.data.push({
              '_id': formFieldId,
              'datum': request.body.record[formFieldId]
            });
          }
          // Push the Record onto the User Table
          userDatabaseData
          .tables.id(request.body.elementId)
          .records.push(newRecord);
          // Save the new User Database
          userDatabaseData.save(function(error, results) {
            if(error) {
              // Handle unknown errors
              console.log(error.message);
              reject('Something went wrong!');
            } else {
              // Return the updated user table
              resolve(results.tables.id(request.body.elementId));
            }
          });
        }
      });
    }
  });
  return promise;
}

/*
 * Method that allows Users to modify an existing Record
 */
function userRecordsUpdate(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId
      || !request.body.elementId
      || !request.body.recordId) {
      // Required IDs
      reject('User Database, Table, and Record IDs are all required!');
    } else if(!request.body.record) {
      // Required fields
      reject('All fields required!');
    } else if(!request.session.userId) {
      // Require the User to be logged in
      reject('You must be logged in to update a Record!');
    } else {
      // Find the Viewsite which has a pending Record update
      userDatabases.findById({'_id': request.body.viewsiteId})
      .exec(function(error, userDatabaseData) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!userDatabaseData) {
          // Handle non-existent query results
          reject('User Database not found!');
        } else if(userDatabaseData.userId != request.session.userId) {
          // Be sure User owns selected Database
          reject('You can only update Records you own!');
        } else if(!userDatabaseData
          .tables.id(request.body.elementId)
          .records.id(request.body.recordId)) {
          // Handle non-existent sub-document query results
          reject('User Record doesn\'t exist!');
        } else {
          // Define the old Record
          let userRecord = userDatabaseData
          .tables.id(request.body.elementId)
          .records.id(request.body.recordId);
          // Create a blank new Record
          let updatedRecord = userDatabaseData
          .tables.id(request.body.elementId)
          .records.create();
          // Make the ID of the new Record the ID of the old Record
          updatedRecord._id = userRecord._id;
          // Fill in the rest of the new Record
          for(formFieldId in request.body.record) {
            updatedRecord.data.push({
              '_id': formFieldId,
              'datum': request.body.record[formFieldId]
            });
          }
          // Update the old Record with the new Record
          userRecord.set(updatedRecord);
          // Save the update User Database
          userDatabaseData.save(function(error, results) {
            if(error) {
              // Handle unknown errors
              console.log(error.message);
              reject('Something went wrong!');
            } else {
              // Return the updated user table
              resolve(results.tables.id(request.body.elementId));
            }
          });
        }
      });
    }
  });
  return promise;
}

/*
 * Method that allows Users to delete an existing Record
 */
function userRecordsDelete(request) {
  var promise = new Promise(function(resolve, reject) {
    if(!request.body.viewsiteId
      || !request.body.elementId
      || !request.body.recordId) {
      // Required IDs
      reject('User Database, Table, and Record IDs are all required!');
    } else if(!request.session.userId) {
      // Require User to be logged in
      reject('You must be logged in to delete a Record!');
    } else {
      // Find Database which has a pending Record deletion
      userDatabases.findOne({'_id': request.body.viewsiteId})
      .exec(function(error, userDatabaseData) {
        if(error) {
          // Handle unknown errors
          console.log(error.message);
          reject('Something went wrong!');
        } else if(!userDatabaseData) {
          // Handle non-existent query results
          reject('User Database not found!');
        } else if(userDatabaseData.userId != request.session.userId) {
          // Be sure the executing User owns this User Database
          reject('You can only delete Records you own!');
        } else if(!userDatabaseData
          .tables.id(request.body.elementId)
          .records.id(request.body.recordId)) {
          // Handle non-existent sub-document query results
          reject('User Record doesn\'t exist!');
        } else {
          // Remove sub-document
          userDatabaseData
          .tables.id(request.body.elementId)
          .records.id(request.body.recordId).remove();
          // Save the new Database
          userDatabaseData.save(function(error, results) {
            if(error) {
              // Handle unknown errors
              console.log(error.message);
              reject('Something went wrong!');
            } else {
              // Return the updated user table
              resolve(results.tables.id(request.body.elementId));
            }
          });
        }
      });
    }
  });
  return promise;
}

// Export all public methods
module.exports.userRecordsCreate = userRecordsCreate;
module.exports.userRecordsUpdate = userRecordsUpdate;
module.exports.userRecordsDelete = userRecordsDelete;
