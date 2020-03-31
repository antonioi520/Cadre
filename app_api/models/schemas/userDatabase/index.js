// Include required modules
var mongoose = require('mongoose');

// Simplify Mongoose properties
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// Require dependent schemas
var userTableSchema = require('./schemas/userTable');
var userUserSchema = require('./schemas/userUser');

// Create User Database schema
var userDatabaseSchema = new Schema({
  'userId': {
    'type': ObjectId,
    'ref': 'user',
    'required': true
  },
  'tables': [userTableSchema],
  'users': [userUserSchema]
});

// Create User Database models
var userDatabase = mongoose.model('userDatabase', userDatabaseSchema);

// Export User Database models
module.exports = userDatabase;
