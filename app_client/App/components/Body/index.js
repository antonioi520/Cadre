// Import required modules
import React from 'react';

// Import requred components
import BodyJSX from './Body.jsx';
import './body.scss';

class Body extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // User Methods
    this.handleLoginUser = this.handleLoginUser.bind(this);
    // Other Methods
    this.handleSetGlobalState = this.handleSetGlobalState.bind(this);
  }

  /*
   * Method that creates a new active session
   * Passed down from the main Application
   */
  handleLoginUser(loginCredentials) {
    this.props.onLoginUser(loginCredentials);
  }

  /*
   * Method that sets the state of the main application
   * Passed down from the main Application
   */
  handleSetGlobalState(newStateData, toSet) {
    this.props.onSetGlobalState(newStateData, toSet);
  }

  /*
   * Render the JSX for the Body view
   */
  render() {
    return(BodyJSX.call(this));
  }
}

// Export the Body
export default Body;
