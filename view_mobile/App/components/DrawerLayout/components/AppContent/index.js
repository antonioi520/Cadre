// Import required modules
import React from 'react';

// Import requred components
import AppContentJSX from './AppContent.js';

class AppContent extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // User's User Methods
    this.handleCreateUserUser = this.handleCreateUserUser.bind(this);
    this.handleLoginUserUser = this.handleLoginUserUser.bind(this);

    // User Database Methods
    this.handleUpdateUserTable = this.handleUpdateUserTable.bind(this);
  }

  /*
   * Method that allows components to request a Viewsite's associated User Database
   * Passed down from the main Application
   */
  handleUpdateUserTable(updatedTable) {
    this.props.onUpdateUserTable(updatedTable);
  }

  /*
   * Method that destroys the current active session
   * Passed down from the main Application
   */
  handleCreateUserUser(request) {
    this.props.onCreateUserUser(request);
  }

  /*
   * Method that destroys the current active session
   * Passed down from the main Application
   */
  handleLoginUserUser(request) {
    this.props.onLoginUserUser(request);
  }

  /*
   * Render the Application Content JSX view
    */
  render() {
    return(AppContentJSX.call(this));
  }
}

// Export the Application Content
export default AppContent;
