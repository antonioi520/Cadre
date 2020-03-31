// Include required modules
var mongoose = require('mongoose');

// Simplify Mongoose properties
var Schema = mongoose.Schema;

// Create user schema
var userSchema = new Schema({
  'username': {
    'type': String,
    'required': true,
    'unique': true
  },
  'password': {
    'type': String,
    'required': true
  }
});

// Catch duplicate username errors on create
userSchema.post('save', function(error, doc, next) {
  if(error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next(error);
  }
});

// Catch duplicate username errors on update
userSchema.post('update', function(error, res, next) {
  if(error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next(error);
  }
});

// Create database models
var user = mongoose.model('user', userSchema);

// Export database models
module.exports = user;
