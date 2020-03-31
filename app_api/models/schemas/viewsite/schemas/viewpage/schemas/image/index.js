// Include required modules
var mongoose = require('mongoose');

// Simplify Mongoose properties
var Schema = mongoose.Schema;

// Create Image Element schema
var imageSchema = new Schema({
  'imageLocation': {
    'type': String,
    'required': true
  }
});

// Export Image schema
module.exports = imageSchema;
