// Include required modules
var mongoose = require('mongoose');

// Simplify Mongoose properties
var Schema = mongoose.Schema;

// Create Textbox Form Input schema
var numberSchema = new Schema({
    'numberLabel': {
        'type': String,
        'required': true
    }
});

// Export Textbox Form Input schema
module.exports = numberSchema;
//////////