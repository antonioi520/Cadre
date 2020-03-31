// Import required modules
import React from 'react';

/*
 * Image Element JSX view
 */
var ImageJSX = function() {
  return (
    <div>
      <img
      className="img-fluid rounded mx-auto d-block"
      src={this.props.element.imageLocation} />

      <br />
    </div>
  );
}

// Export Image Element JSX view
export default ImageJSX;
