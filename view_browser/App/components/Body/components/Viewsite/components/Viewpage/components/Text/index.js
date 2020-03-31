// Import required modules
import React from 'react';

// Import required components
import TextJSX from './Text.jsx';
import './text.scss';

class Text extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);
  }

  /*
   * Render Text Element JSX view
   */
  render() {
    return(TextJSX.call(this));
  }
}

// Export Text Element
export default Text;
