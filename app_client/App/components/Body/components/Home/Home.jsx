// Import required modules
import React from 'react';

/*
 * Home view
 */
var HomeJSX = function() {
  return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 offset-4">
              <img src="/logo.png" className="img-fluid height:auto max-width:80%" />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <h1 className="display-3">
                  Cadre
                </h1>
                <p className="lead">
                  The place where anyone can make a Website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

// Export the Home view
export default HomeJSX;
