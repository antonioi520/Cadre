// Import required modules
import React from 'react';

// Import required components
import ImageViewJSX from './ImageView.js';

class ImageView extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);
  }

  /*
   * Render Image View JSX view
   */
  render() {
    return(ImageViewJSX.call(this));
  }
}

// Export Image View
export default ImageView;
