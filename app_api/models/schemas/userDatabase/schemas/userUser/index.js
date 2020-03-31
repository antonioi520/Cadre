// Include required modules
var mongoose = require('mongoose');

// Simplify Mongoose properties
var Schema = mongoose.Schema;

// Create user schema
var userUserSchema = new Schema({
  'username': {
    'type': String,
    'required': true
  },
  'password': {
    'type': String,
    'required': true
  },
  'permissionLevel': {
    'type': Number,
    'default': 3
  }
});

// Export database models
module.exports = userUserSchema;
