// Include required modules
var mongoose = require('mongoose');

// Simplify Mongoose properties
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// Create Data View schema
var dataViewSchema = new Schema({
  'formId': {
    'type': ObjectId,
    'required': true
  }
});

// Export Data View schema
module.exports = dataViewSchema;
