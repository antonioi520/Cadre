// Import required modules
import React from 'react';

// Import required components
import AppJSX from './App.js';

class App extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);
  }

  /*
   * Render main Application view
   */
  render() {
    return(AppJSX.call(this));
  }
}

// Export main Application
export default App;
