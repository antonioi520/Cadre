// Import required modules
import React from 'react';

// Import required components
import ImageJSX from './Image.jsx';
import './image.scss';

class Image extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);
  }

  /*
   * Render Image Element JSX view
   */
  render() {
    return(ImageJSX.call(this));
  }
}

// Export Image Element
export default Image;
