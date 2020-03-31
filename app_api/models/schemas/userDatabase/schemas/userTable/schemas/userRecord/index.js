// Include required modules
var mongoose = require('mongoose');

// Simplify Mongoose properties
var Schema = mongoose.Schema;

// Require dependent schemas
var userDatumSchema = require('./schemas/userDatum');

// Create user record sub-schema for the user table schema
var userRecordSchema = new Schema({
  'data': [userDatumSchema]
});

// Export schema
module.exports = userRecordSchema;
