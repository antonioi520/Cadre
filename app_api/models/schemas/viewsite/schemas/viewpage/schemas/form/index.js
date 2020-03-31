// Include required modules
var mongoose = require('mongoose');

// Simplify Mongoose properties
var Schema = mongoose.Schema;

// Require child schemas
var textboxSchema = require('./schemas/textbox');
var numberSchema = require('./schemas/number');
var textareaSchema = require('./schemas/textarea');
var checkboxSchema = require('./schemas/checkbox');
// Define Form Input parent class schema
var formInputSchema = new Schema({},
  { discriminatorKey: 'kind' });

// Define main Form schema
var formSchema = new Schema({
  'formTitle': {
    'type': String,
    'required': true
  },
  'formInputs': [formInputSchema]
});

// Get the parent array of Form Inputs in the Form
var formInputArray = formSchema.path('formInputs');

// Create Form Input child class discriminators
var textbox = formInputArray.discriminator('textbox', textboxSchema);
var number = formInputArray.discriminator('number', numberSchema);
var textarea = formInputArray.discriminator('textarea', textareaSchema);
var checkbox = formInputArray.discriminator('checkbox', checkboxSchema);
// Export Form schema
module.exports = formSchema;
