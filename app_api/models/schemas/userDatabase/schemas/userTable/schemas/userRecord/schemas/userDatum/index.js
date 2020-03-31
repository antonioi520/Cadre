// Include required modules
var mongoose = require('mongoose');

// Simplify Mongoose properties
var Schema = mongoose.Schema;

// Create user datum sub-schema for the user record schema
var userDatumSchema = new Schema({
  'datum': {
    'type': String,
    'default': ''
  }
});

// Export schema
module.exports = userDatumSchema;
