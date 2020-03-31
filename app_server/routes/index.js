// Include required modules
var express = require('express');
var router = express.Router();

// Include the controller
var controller = require('../controllers/index');

// Set up routing for the controller
router.all('/', controller.cadre);
router.all('/viewsites/:viewsiteName?', controller.viewBrowser);
router.all('/*', controller.redirect);

// Export the main router
module.exports = router;
