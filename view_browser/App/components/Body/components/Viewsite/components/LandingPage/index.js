// Import required modules
import React from 'react';
import { Redirect } from 'react-router-dom';

// Import requred components
import LandingPageJSX from './LandingPage.jsx';
import './landingPage.scss';

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
