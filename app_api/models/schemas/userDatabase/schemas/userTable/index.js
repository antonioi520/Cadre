// Include required modules
var mongoose = require('mongoose');

// Simplify Mongoose properties
var Schema = mongoose.Schema;

// Require dependent schemas
var userRecordSchema = require('./schemas/userRecord');

// Create user table sub-schema for the user database schema
var userTableSchema = new Schema({
  'records': [userRecordSchema]
});

// Export schema
module.exports = userTableSchema;
