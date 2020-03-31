// Import required modules
import React from 'react';

// Import requred components
import HeaderJSX from './Header.jsx';
import './header.scss';

class Header extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // User Methods
    this.handleLogoutUser = this.handleLogoutUser.bind(this);
  }

  /*
   * Method that destroys the current active session
   * Passed down from the main Application
   */
  handleLogoutUser() {
    this.props.onLogoutUser();
  }

  /*
   * Render the JSX for the Header view
   */
  render() {
    return (HeaderJSX.call(this));
  }
}

// Export the Header
export default Header;
