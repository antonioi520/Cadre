// Include required modules
var mongoose = require('mongoose');

// Simplify Mongoose properties
var Schema = mongoose.Schema;

// Create Text Element schema
var textSchema = new Schema({
  'textValue': {
    'type': String,
    'required': true
  }
});

// Export Text schema
module.exports = textSchema;
