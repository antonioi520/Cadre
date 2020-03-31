// Include required modules
var mongoose = require('mongoose');

// Simplify Mongoose properties
var Schema = mongoose.Schema;

// Create Textbox Form Input schema
var checkboxSchema = new Schema({
    'checkboxLabel': {
        'type': String,
        'required': true
    }
});

// Export Textbox Form Input schema
module.exports = checkboxSchema;
//////////