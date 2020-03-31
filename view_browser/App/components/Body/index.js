// Import required modules
import React from 'react';

// Import requred components
import BodyJSX from './Body.jsx';
import './body.scss';

class Body extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // User User Methods
    this.handleCreateUserUser = this.handleCreateUserUser.bind(this);
    this.handleLoginUserUser = this.handleLoginUserUser.bind(this);

    // Viewsite Methods
    this.handleRequestViewsite = this.handleRequestViewsite.bind(this);

    // User Database Methods
    this.handleUpdateUserTable = this.handleUpdateUserTable.bind(this);
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
   * Method that allows components to request a Viewsite
   * Passed down from the main Application
   */
  handleRequestViewsite(viewsiteId) {
    this.props.onRequestViewsite(viewsiteId);
  }

  /*
   * Method that allows components to request a Viewsite's associated User Database
   * Passed down from the main Application
   */
  handleUpdateUserTable(updatedTable) {
    this.props.onUpdateUserTable(updatedTable);
  }

  /*
   * Render the Body JSX view
   */
  render() {
    return(BodyJSX.call(this));
  }
}

// Export the Body
export default Body;
