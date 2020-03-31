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
   * Render the Footer JSX view
   * Only if a selected Viewsite exists
   */
  render() {
    if(this.props.viewsite) {
      return(FooterJSX.call(this));
    } else {
      return null;
    }
  }
}

// Export Footer
export default Footer;
