// Import required modules
import React from 'react';

// Import requred components
import LandingPageJSX from './LandingPage.js';
import './styles.js';

class LandingPage extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);
  }

  /*
   * Render Landing Page JSX view
   */
  render() {
    return(LandingPageJSX.call(this));
  }
}

// Export Landing Page
export default LandingPage;
