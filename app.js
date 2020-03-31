// Add required modules already built into Nodejs
var path = require('path');
var fs = require("fs");

// Add required modules created by a third parties
var cors = require('cors');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var fileUpload = require('express-fileupload');

// Bring in the database connection and all its models
require('./app_api/models/db');
var db = mongoose.connection;

// Include the API routes
var routesServer = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');

// Create the main Express application
var app = express();

// Set the application view engine
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// Set the Application local directories
app.locals.basedir = path.join(__dirname, 'public');

// Set the application icon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Configure the Express Session middleware
app.use(session({
  secret: '3Y8tQ9TUo9uJd6f',
  store: new mongoStore({mongooseConnection: db})
}));

// Configure the Express File Upload middleware
app.use(fileUpload());

// Configure the logger middleware
app.use(logger('dev'));

// Configure the Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure the Cookie Parser middleware
app.use(cookieParser());

// Configure the Static Application directories
app.use(express.static(path.join(__dirname, 'public')));

// Configure the Cross-Origin-Request middleware
app.use(cors());

// Configure json output to look nice
app.set('json spaces', 2);

// Add the application routes
app.use('/api/v1', routesApi);
app.use('/', routesServer);

// Catch 404 errors and forward to error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*
 * Error handlers
 */

// Development error handler
if(app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      "error": {
        "message": err.message,
        "status": err.status
      }
    });
  });
}

// Production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    "error": {
      "message": 'Something failed!',
      "status": 500
    }
  });
});

// Export the Application
module.exports = app;
