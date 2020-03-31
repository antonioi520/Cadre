// Controller for the main application
module.exports.cadre = function(req, res) {
  res.render('layout', {});
}

// Controller for the browser view
module.exports.viewBrowser = function(req, res) {
  res.render('layout_viewBrowser', {viewsiteName: req.params.viewsiteName});
}

// Redirect all other routes to the main application
module.exports.redirect = function(req, res) {
  res.redirect('/');
}
