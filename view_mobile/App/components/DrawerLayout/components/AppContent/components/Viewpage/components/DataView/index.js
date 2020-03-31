// Import required modules
import React from 'react';

// Import required components
import DataViewJSX from './DataView.js';

class DataView extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);
  }

  /*
   * Render Data View JSX view
   */
  render() {
    return(DataViewJSX.call(this));
  }
}

// Export Data View
export default DataView;
