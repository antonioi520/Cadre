// Import required modules
import React from 'react';

// Import requred components
import FooterJSX from './Footer.jsx';
import './footer.scss';

class Footer extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);
  }

  /*
   * Render the JSX for the Footer view
   */
  render() {
    return(FooterJSX.call(this));
  }
}

// Export the Footer
export default Footer;
