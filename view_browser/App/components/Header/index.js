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
    this.handleLogoutUserUser = this.handleLogoutUserUser.bind(this);
  }

  /*
   * Method that destroys the current active session
   * Passed down from the main Application
   */
  handleLogoutUserUser() {
    this.props.onLogoutUserUser();
  }

  /*
   * Render the Header JSX viewsite
   * Only if a selected Viewsite exists
   */
  render() {
    if(this.props.viewsite) {
      return(HeaderJSX.call(this));
    } else {
      return null;
    }
  }
}

// Export the Header
export default Header;
