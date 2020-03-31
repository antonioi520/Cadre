// Import required modules
import React from 'react';
import { Redirect } from 'react-router-dom';

// Import required components
import LoginJSX from './Login.jsx';
import './login.scss';

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
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let changeLoginCredentials = this.state.loginCredentials;
    changeLoginCredentials[name] = value;
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
      viewsiteId: this.props.viewsite._id,
      username: this.state.loginCredentials.username,
      password: this.state.loginCredentials.password
    };
    this.props.onSubmit(request);
  }

  /*
   * Render the Login form view
   * Only if a user is not logged in
   */
  render() {
    if(this.props.loggedIn) {
      return(<Redirect to={"/viewsites/" + this.props.viewsite.viewsiteName}  />);
    } else {
      return(LoginJSX.call(this));
    }
  }
}

// Export the Login form
export default Login;
