// Include required modules
var mongoose = require('mongoose');

// Simplify Mongoose properties
var Schema = mongoose.Schema;

// Create Textbox Form Input schema
var textareaSchema = new Schema({
  'textareaLabel': {
    'type': String,
    'required': true
  }
});

// Export Textbox Form Input schema
module.exports = textareaSchema;
