// Import required modules
import React from 'react';
import { Redirect } from 'react-router-native';

// Import required components
import LoginJSX from './Login.js';
import './styles.js';

class Login extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // Other Methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Set initial state
    this.state = {
      loginCredentials: {
        username: "",
        password: ""
      }
    }
  }



  /*
   * Method that allows local state to reflect what a User types
   */
  handleChange(credentialValue, credentialName) {
    let changeLoginCredentials = this.state.loginCredentials;
    changeLoginCredentials[credentialName] = credentialValue.text;
    this.setState({
      'loginCredentials': changeLoginCredentials
    });
  }

  /*
   * Method that controls what happens after a form has been submited
   */
  handleSubmit(event) {
    event.preventDefault();
    let request = {
      viewsiteId: this.props.viewsiteId,
      username: this.state.loginCredentials.username,
      password: this.state.loginCredentials.password
    };
    this.props.onLoginUserUser(request);
  }

  /*
   * Render the Login form view
   * Only if a user is not logged in
   */
  render() {
    if(this.props.loggedIn) {
      return(<Redirect to={"/"}  />);
    } else {
      return(LoginJSX.call(this));
    }
  }
}

// Export the Login form
export default Login;
