#!/usr/bin/env node

// Include required modules
var debug = require('debug')('Express4');
var app = require('./app');

// Set the app to run on port 3000
app.set('port', process.env.PORT || 3000);

// Start the server to be listening on the selected port
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
