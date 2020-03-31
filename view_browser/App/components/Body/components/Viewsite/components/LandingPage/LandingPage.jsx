// Import required modules
import React from 'react';

/*
 * Landing Page JSX view
 */
var LandingPageJSX = function() {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container-fluid">
          <div className="offset-1">
            <h1 className="display-3">
              {this.props.viewsite.viewsiteName}
            </h1>

            <p className="lead"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the Landing Page JSX view
export default LandingPageJSX;
